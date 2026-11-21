let currentAPI = '';
let currentUser = null;
let savedApiKeys = {};
let currentTheme = 'system';
const apiConfigs = {
    'OpenAI': {
        name: 'OpenAI',
        defaultEndpoint: 'https://api.openai.com/v1/chat/completions',
        defaultMethod: 'POST',
        defaultHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {API_KEY}'
        },
        defaultBody: {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Привет!' }]
        },
        keyPlaceholder: 'sk-...'
    },
    'Telegram': {
        name: 'Telegram',
        defaultEndpoint: 'https://api.telegram.org/bot{TOKEN}/getMe',
        defaultMethod: 'GET',
        defaultHeaders: {},
        defaultBody: null,
        keyPlaceholder: 'Токен бота из @BotFather'
    },
    'VK': {
        name: 'VK',
        defaultEndpoint: 'https://api.vk.com/method/users.get',
        defaultMethod: 'GET',
        defaultHeaders: {},
        defaultBody: null,
        keyPlaceholder: 'Access Token'
    },
    'GitHub': {
        name: 'GitHub',
        defaultEndpoint: 'https://api.github.com/user',
        defaultMethod: 'GET',
        defaultHeaders: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': 'token {API_KEY}'
        },
        defaultBody: null,
        keyPlaceholder: 'ghp_...'
    },
    'Discord': {
        name: 'Discord',
        defaultEndpoint: 'https://discord.com/api/v10/users/@me',
        defaultMethod: 'GET',
        defaultHeaders: {
            'Authorization': 'Bot {API_KEY}'
        },
        defaultBody: null,
        keyPlaceholder: 'Токен бота'
    },
    'Twitter': {
        name: 'Twitter',
        defaultEndpoint: 'https://api.twitter.com/2/users/me',
        defaultMethod: 'GET',
        defaultHeaders: {
            'Authorization': 'Bearer {API_KEY}'
        },
        defaultBody: null,
        keyPlaceholder: 'Bearer Token'
    },
    'Google Maps': {
        name: 'Google Maps',
        defaultEndpoint: 'https://maps.googleapis.com/maps/api/geocode/json?address=Moscow&key={API_KEY}',
        defaultMethod: 'GET',
        defaultHeaders: {},
        defaultBody: null,
        keyPlaceholder: 'API Key'
    },
    'Stripe': {
        name: 'Stripe',
        defaultEndpoint: 'https://api.stripe.com/v1/customers',
        defaultMethod: 'GET',
        defaultHeaders: {
            'Authorization': 'Bearer {API_KEY}'
        },
        defaultBody: null,
        keyPlaceholder: 'sk_test_...'
    },
    'Spotify': {
        name: 'Spotify',
        defaultEndpoint: 'https://api.spotify.com/v1/me',
        defaultMethod: 'GET',
        defaultHeaders: {
            'Authorization': 'Bearer {API_KEY}'
        },
        defaultBody: null,
        keyPlaceholder: 'Access Token'
    },
    'YouTube': {
        name: 'YouTube',
        defaultEndpoint: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=javascript&key={API_KEY}',
        defaultMethod: 'GET',
        defaultHeaders: {},
        defaultBody: null,
        keyPlaceholder: 'API Key'
    }
};
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    checkAuth();
    setupAuthTabs();
    setupNavigation();
    setupHTTPMethodChange();
});
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    currentTheme = savedTheme;
    applyTheme(currentTheme);
}
function applyTheme(theme) {
    if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        document.querySelector('.theme-icon').textContent = '🌓';
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}
function toggleTheme() {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
}
function setupAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            if (targetTab === 'login') {
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.getElementById('registerForm').classList.add('active');
            }
        });
    });
}
async function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const errorEl = document.getElementById('registerError');
    errorEl.classList.remove('active');
    if (!username || !password) {
        showError(errorEl, 'Заполните все поля');
        return;
    }
    try {
        const response = await fetch('api.php?action=register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            currentUser = data.username;
            showMainApp();
        } else {
            showError(errorEl, data.error);
        }
    } catch (error) {
        showError(errorEl, 'Ошибка соединения с сервером');
    }
}
async function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    errorEl.classList.remove('active');
    if (!username || !password) {
        showError(errorEl, 'Заполните все поля');
        return;
    }
    try {
        const response = await fetch('api.php?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            currentUser = data.username;
            showMainApp();
        } else {
            showError(errorEl, data.error);
        }
    } catch (error) {
        showError(errorEl, 'Ошибка соединения с сервером');
    }
}
async function logout() {
    try {
        await fetch('api.php?action=logout');
        location.reload();
    } catch (error) {
        console.error('Ошибка выхода:', error);
    }
}
async function checkAuth() {
    try {
        const response = await fetch('api.php?action=checkAuth');
        const data = await response.json();
        if (data.success) {
            currentUser = data.username;
            showMainApp();
        }
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
    }
}
function showMainApp() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    document.getElementById('usernameDisplay').textContent = currentUser;
    loadApiKeys();
    loadApiRatings();
    loadTutorials();
}
function showError(element, message) {
    element.textContent = message;
    element.classList.add('active');
}
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.dataset.view;
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });
            document.getElementById(viewName + 'View').classList.add('active');
            if (viewName === 'saved') {
                loadSavedRequests();
            } else if (viewName === 'tutorials') {
                loadTutorials();
            } else if (viewName === 'ratings') {
                loadApiRatings();
            } else if (viewName === 'history') {
                loadRequestHistory();
            }
        });
    });
}
function changeAPI() {
    const apiName = document.getElementById('apiSelector').value;
    if (!apiName) {
        document.getElementById('apiPlayground').style.display = 'none';
        document.getElementById('noApiSelected').style.display = 'block';
        return;
    }
    currentAPI = apiName;
    document.getElementById('apiPlayground').style.display = 'block';
    document.getElementById('noApiSelected').style.display = 'none';
    const config = apiConfigs[apiName];
    document.getElementById('httpMethod').value = config.defaultMethod;
    document.getElementById('endpointUrl').value = config.defaultEndpoint;
    document.getElementById('headersInput').value = JSON.stringify(config.defaultHeaders, null, 2);
    document.getElementById('bodyInput').value = config.defaultBody ? JSON.stringify(config.defaultBody, null, 2) : '';
    document.getElementById('apiKeyInput').placeholder = config.keyPlaceholder;
    if (savedApiKeys[apiName]) {
        document.getElementById('apiKeyInput').value = savedApiKeys[apiName];
    } else {
        document.getElementById('apiKeyInput').value = '';
    }
    setupHTTPMethodChange();
    updateRequestPreview();
    document.getElementById('responseCard').style.display = 'none';
}
function setupHTTPMethodChange() {
    const methodSelect = document.getElementById('httpMethod');
    const bodyGroup = document.getElementById('bodyGroup');
    methodSelect.addEventListener('change', () => {
        const method = methodSelect.value;
        if (method === 'GET' || method === 'DELETE') {
            bodyGroup.style.display = 'none';
        } else {
            bodyGroup.style.display = 'block';
        }
        updateRequestPreview();
    });
    methodSelect.dispatchEvent(new Event('change'));
}
function updateRequestPreview() {
    const method = document.getElementById('httpMethod').value;
    const endpoint = document.getElementById('endpointUrl').value;
    const headersText = document.getElementById('headersInput').value;
    const body = document.getElementById('bodyInput').value;
    let preview = `${method} ${endpoint}\n\n`;
    try {
        const headers = JSON.parse(headersText || '{}');
        if (Object.keys(headers).length > 0) {
            preview += 'Headers:\n';
            for (const [key, value] of Object.entries(headers)) {
                preview += `  ${key}: ${value}\n`;
            }
        }
    } catch (e) {
        preview += 'Headers: [Invalid JSON]\n';
    }
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        preview += '\nBody:\n';
        try {
            const bodyObj = JSON.parse(body);
            preview += JSON.stringify(bodyObj, null, 2);
        } catch (e) {
            preview += body;
        }
    }
    document.getElementById('requestPreview').textContent = preview;
}
document.addEventListener('DOMContentLoaded', () => {
    ['httpMethod', 'endpointUrl', 'headersInput', 'bodyInput'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updateRequestPreview);
        }
    });
});
async function sendRequest() {
    const method = document.getElementById('httpMethod').value;
    let endpoint = document.getElementById('endpointUrl').value;
    const headersText = document.getElementById('headersInput').value;
    const body = document.getElementById('bodyInput').value;
    const apiKey = document.getElementById('apiKeyInput').value;
    if (!endpoint) {
        alert('Укажите endpoint URL');
        return;
    }
    endpoint = endpoint.replace('{API_KEY}', apiKey).replace('{TOKEN}', apiKey);
    let headers = {};
    try {
        headers = JSON.parse(headersText || '{}');
        for (const key in headers) {
            headers[key] = headers[key].replace('{API_KEY}', apiKey).replace('{TOKEN}', apiKey);
        }
    } catch (e) {
        alert('Ошибка в формате заголовков (должен быть JSON)');
        return;
    }
    const requestData = {
        method,
        url: endpoint,
        headers,
        body: (method === 'POST' || method === 'PUT' || method === 'PATCH') ? body : '',
        apiName: currentAPI
    };
    try {
        const response = await fetch('api.php?action=proxyRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });
        const data = await response.json();
        if (data.success) {
            displayResponse(data);
        } else {
            displayError(data.error);
        }
    } catch (error) {
        displayError('Ошибка отправки запроса: ' + error.message);
    }
}
function displayResponse(data) {
    const responseCard = document.getElementById('responseCard');
    const statusBadge = document.getElementById('statusBadge');
    const timeBadge = document.getElementById('timeBadge');
    const responseOutput = document.getElementById('responseOutput');
    responseCard.style.display = 'block';
    statusBadge.textContent = `Status: ${data.statusCode}`;
    statusBadge.className = 'status-badge';
    if (data.statusCode >= 200 && data.statusCode < 300) {
        statusBadge.classList.add('status-success');
    } else {
        statusBadge.classList.add('status-error');
    }
    timeBadge.textContent = `${data.responseTime} ms`;
    try {
        const jsonResponse = JSON.parse(data.response);
        responseOutput.textContent = JSON.stringify(jsonResponse, null, 2);
    } catch (e) {
        responseOutput.textContent = data.response;
    }
    responseCard.scrollIntoView({ behavior: 'smooth' });
}
function displayError(error) {
    const responseCard = document.getElementById('responseCard');
    const statusBadge = document.getElementById('statusBadge');
    const timeBadge = document.getElementById('timeBadge');
    const responseOutput = document.getElementById('responseOutput');
    responseCard.style.display = 'block';
    statusBadge.textContent = 'Error';
    statusBadge.className = 'status-badge status-error';
    timeBadge.textContent = '-';
    responseOutput.textContent = error;
    responseCard.scrollIntoView({ behavior: 'smooth' });
}
async function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (!apiKey) {
        alert('Введите API ключ');
        return;
    }
    try {
        const response = await fetch('api.php?action=saveApiKey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiName: currentAPI, apiKey })
        });
        const data = await response.json();
        if (data.success) {
            savedApiKeys[currentAPI] = apiKey;
            alert('API ключ сохранён');
        } else {
            alert('Ошибка сохранения: ' + data.error);
        }
    } catch (error) {
        alert('Ошибка соединения с сервером');
    }
}
async function loadApiKeys() {
    try {
        const response = await fetch('api.php?action=getApiKeys');
        const data = await response.json();
        if (data.success) {
            savedApiKeys = data.keys;
        }
    } catch (error) {
        console.error('Ошибка загрузки API ключей:', error);
    }
}
function toggleApiKeyVisibility() {
    const input = document.getElementById('apiKeyInput');
    input.type = input.type === 'password' ? 'text' : 'password';
}
function saveCurrentRequest() {
    document.getElementById('saveModal').classList.add('active');
}
function closeSaveModal() {
    document.getElementById('saveModal').classList.remove('active');
    document.getElementById('saveRequestName').value = '';
    document.getElementById('saveRequestDescription').value = '';
}
async function confirmSaveRequest() {
    const requestName = document.getElementById('saveRequestName').value.trim();
    const description = document.getElementById('saveRequestDescription').value.trim();
    if (!requestName) {
        alert('Введите название запроса');
        return;
    }
    const method = document.getElementById('httpMethod').value;
    const endpoint = document.getElementById('endpointUrl').value;
    const headersText = document.getElementById('headersInput').value;
    const body = document.getElementById('bodyInput').value;
    let headers = {};
    try {
        headers = JSON.parse(headersText || '{}');
    } catch (e) {
        alert('Ошибка в формате заголовков');
        return;
    }
    const requestData = {
        apiName: currentAPI,
        requestName,
        description,
        method,
        endpoint,
        headers,
        body
    };
    try {
        const response = await fetch('api.php?action=saveRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });
        const data = await response.json();
        if (data.success) {
            alert('Запрос сохранён');
            closeSaveModal();
        } else {
            alert('Ошибка сохранения: ' + data.error);
        }
    } catch (error) {
        alert('Ошибка соединения с сервером');
    }
}
async function loadSavedRequests() {
    try {
        const response = await fetch('api.php?action=getSavedRequests');
        const data = await response.json();
        if (data.success) {
            displaySavedRequests(data.requests);
        }
    } catch (error) {
        console.error('Ошибка загрузки запросов:', error);
    }
}
function displaySavedRequests(requests) {
    const container = document.getElementById('savedRequestsList');
    if (requests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h2>Нет сохранённых запросов</h2>
                <p>Сохраните свои первые запросы в песочнице</p>
            </div>
        `;
        return;
    }
    container.innerHTML = requests.map(req => `
        <div class="request-card">
            <div class="request-meta">
                <span class="meta-badge method-${req.method.toLowerCase()}">${req.method}</span>
                <span class="meta-badge api-badge">${req.api_name}</span>
                ${req.is_tutorial == 1 ? '<span class="meta-badge tutorial-badge">📚 Учебный</span>' : ''}
            </div>
            <h4>${req.request_name}</h4>
            ${req.description ? `<p class="request-description">${req.description}</p>` : ''}
            <div class="request-endpoint">${req.endpoint}</div>
            <div class="request-actions">
                <button class="btn-primary" onclick="loadRequest(${req.id})">Загрузить</button>
                ${req.is_tutorial == 0 ? `<button class="btn-secondary" onclick="deleteRequest(${req.id})">Удалить</button>` : ''}
            </div>
        </div>
    `).join('');
}
async function loadRequest(requestId) {
    try {
        const response = await fetch('api.php?action=getSavedRequests');
        const data = await response.json();
        if (data.success) {
            const request = data.requests.find(r => r.id == requestId);
            if (request) {
                document.querySelector('[data-view="playground"]').click();
                document.getElementById('apiSelector').value = request.api_name;
                changeAPI();
                document.getElementById('httpMethod').value = request.method;
                document.getElementById('endpointUrl').value = request.endpoint;
                document.getElementById('headersInput').value = JSON.stringify(request.headers, null, 2);
                document.getElementById('bodyInput').value = request.body || '';
                updateRequestPreview();
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки запроса:', error);
    }
}
async function deleteRequest(requestId) {
    if (!confirm('Удалить этот запрос?')) {
        return;
    }
    try {
        const response = await fetch('api.php?action=deleteRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requestId })
        });
        const data = await response.json();
        if (data.success) {
            loadSavedRequests();
        }
    } catch (error) {
        console.error('Ошибка удаления запроса:', error);
    }
}
async function loadTutorials() {
    try {
        const response = await fetch('api.php?action=getTutorials');
        const data = await response.json();
        if (data.success) {
            displayTutorials(data.tutorials);
        }
    } catch (error) {
        console.error('Ошибка загрузки учебных сценариев:', error);
    }
}
function displayTutorials(tutorials) {
    const container = document.getElementById('tutorialsList');
    const grouped = {};
    tutorials.forEach(tut => {
        if (!grouped[tut.api_name]) {
            grouped[tut.api_name] = [];
        }
        grouped[tut.api_name].push(tut);
    });
    container.innerHTML = Object.keys(grouped).map(apiName => `
        <div class="tutorial-group">
            <h3 style="margin: 24px 0 16px 0; color: var(--primary-color);">${apiName}</h3>
            <div class="tutorials-list">
                ${grouped[apiName].map(tut => `
                    <div class="tutorial-card" onclick="loadRequest(${tut.id})">
                        <div class="request-meta">
                            <span class="meta-badge method-${tut.method.toLowerCase()}">${tut.method}</span>
                            <span class="meta-badge tutorial-badge">📚 Учебный</span>
                        </div>
                        <h4>${tut.request_name}</h4>
                        <p class="request-description">${tut.description}</p>
                        <div class="request-endpoint">${tut.endpoint}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}
async function loadApiRatings() {
    try {
        const response = await fetch('api.php?action=getApiRatings');
        const data = await response.json();
        if (data.success) {
            displayApiRatings(data.ratings);
        }
    } catch (error) {
        console.error('Ошибка загрузки рейтинга:', error);
    }
}
function displayApiRatings(ratings) {
    const container = document.getElementById('ratingsChart');
    const maxCount = Math.max(...ratings.map(r => r.usage_count), 1);
    container.innerHTML = ratings.map((rating, index) => `
        <div class="rating-item">
            <div class="rating-position">#${index + 1}</div>
            <div class="rating-info">
                <div class="rating-name">${rating.api_name}</div>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: ${(rating.usage_count / maxCount) * 100}%"></div>
                </div>
            </div>
            <div class="rating-count">${rating.usage_count}</div>
        </div>
    `).join('');
}
async function loadRequestHistory() {
    try {
        const response = await fetch('api.php?action=getRequestHistory');
        const data = await response.json();
        if (data.success) {
            displayRequestHistory(data.history);
        }
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
}
function displayRequestHistory(history) {
    const container = document.getElementById('historyList');
    if (history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <h2>История пуста</h2>
                <p>Отправьте первый запрос в песочнице</p>
            </div>
        `;
        return;
    }
    container.innerHTML = history.map(item => `
        <div class="history-card">
            <div class="request-meta">
                <span class="meta-badge method-${item.method.toLowerCase()}">${item.method}</span>
                <span class="meta-badge api-badge">${item.api_name}</span>
                <span class="status-badge ${item.status_code >= 200 && item.status_code < 300 ? 'status-success' : 'status-error'}">
                    ${item.status_code}
                </span>
                <span class="time-badge">${item.response_time} ms</span>
            </div>
            <div class="request-endpoint">${item.endpoint}</div>
            <div class="history-time">${formatDate(item.created_at)}</div>
        </div>
    `).join('');
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) {
        return 'только что';
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)} мин назад`;
    } else if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)} ч назад`;
    } else {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
function clearForm() {
    if (confirm('Очистить все поля?')) {
        document.getElementById('endpointUrl').value = '';
        document.getElementById('headersInput').value = '{}';
        document.getElementById('bodyInput').value = '';
        document.getElementById('responseCard').style.display = 'none';
        updateRequestPreview();
    }
}
const helpContent = {
    apiKey: {
        title: '🔑 Что такое API ключ?',
        content: `
            <p>API ключ (или токен) - это уникальный идентификатор, который используется для аутентификации ваших запросов к API.</p>
            <br>
            <p><strong>Где получить API ключ:</strong></p>
            <ul>
                <li><strong>OpenAI:</strong> platform.openai.com/api-keys</li>
                <li><strong>Telegram:</strong> Создайте бота через @BotFather</li>
                <li><strong>GitHub:</strong> Settings → Developer settings → Personal access tokens</li>
                <li><strong>VK:</strong> vk.com/dev → Создать приложение</li>
            </ul>
            <br>
            <p><strong>⚠️ Важно:</strong> Никогда не делитесь своими API ключами!</p>
        `
    },
    endpoint: {
        title: '📍 Что такое Endpoint?',
        content: `
            <p>Endpoint (конечная точка) - это URL-адрес, по которому отправляется запрос к API.</p>
            <br>
            <p><strong>Пример:</strong></p>
            <code>https:
            <br><br>
            <p>Каждый endpoint отвечает за определённое действие:</p>
            <ul>
                <li>Получение данных пользователя</li>
                <li>Отправка сообщения</li>
                <li>Создание записи</li>
                <li>И т.д.</li>
            </ul>
        `
    },
    headers: {
        title: '📋 Что такое Headers?',
        content: `
            <p>Headers (заголовки) - это дополнительная информация, отправляемая вместе с запросом.</p>
            <br>
            <p><strong>Типичные заголовки:</strong></p>
            <ul>
                <li><code>Content-Type</code> - формат данных (обычно application/json)</li>
                <li><code>Authorization</code> - данные авторизации (API ключ/токен)</li>
                <li><code>Accept</code> - желаемый формат ответа</li>
            </ul>
            <br>
            <p><strong>Формат:</strong> JSON объект</p>
            <code>{"Content-Type": "application/json"}</code>
        `
    },
    body: {
        title: '📦 Что такое Body?',
        content: `
            <p>Body (тело запроса) - это данные, которые вы отправляете на сервер.</p>
            <br>
            <p>Используется в методах:</p>
            <ul>
                <li><strong>POST</strong> - создание новых данных</li>
                <li><strong>PUT</strong> - полное обновление</li>
                <li><strong>PATCH</strong> - частичное обновление</li>
            </ul>
            <br>
            <p><strong>Формат:</strong> Обычно JSON</p>
            <code>{"message": "Привет, мир!"}</code>
            <br><br>
            <p>В GET и DELETE запросах body обычно не используется.</p>
        `
    }
};
function showHelp(topic) {
    const modal = document.getElementById('helpModal');
    const title = document.getElementById('helpTitle');
    const content = document.getElementById('helpContent');
    const help = helpContent[topic];
    if (help) {
        title.textContent = help.title;
        content.innerHTML = help.content;
        modal.classList.add('active');
    }
}
function closeHelp() {
    document.getElementById('helpModal').classList.remove('active');
}
window.onclick = function(event) {
    const helpModal = document.getElementById('helpModal');
    const saveModal = document.getElementById('saveModal');
    if (event.target === helpModal) {
        closeHelp();
    }
    if (event.target === saveModal) {
        closeSaveModal();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const loginPassword = document.getElementById('loginPassword');
    if (loginPassword) {
        loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') login();
        });
    }
    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') register();
        });
    }
});
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const wrapper = input.closest('.input-wrapper');
    const button = wrapper ? wrapper.querySelector('.toggle-password') : null;
    if (!button) return;
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
        button.title = 'Скрыть пароль';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
        button.title = 'Показать пароль';
    }
}