<?php
require_once 'config.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
$db = Database::getInstance();
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'register':
        handleRegister($db);
        break;
    case 'login':
        handleLogin($db);
        break;
    case 'logout':
        handleLogout();
        break;
    case 'checkAuth':
        handleCheckAuth();
        break;
    case 'saveApiKey':
        handleSaveApiKey($db);
        break;
    case 'getApiKeys':
        handleGetApiKeys($db);
        break;
    case 'saveRequest':
        handleSaveRequest($db);
        break;
    case 'getSavedRequests':
        handleGetSavedRequests($db);
        break;
    case 'deleteRequest':
        handleDeleteRequest($db);
        break;
    case 'proxyRequest':
        handleProxyRequest($db);
        break;
    case 'getApiRatings':
        handleGetApiRatings($db);
        break;
    case 'getTutorials':
        handleGetTutorials($db);
        break;
    case 'getRequestHistory':
        handleGetRequestHistory($db);
        break;
    default:
        jsonResponse(['success' => false, 'error' => 'Неизвестное действие']);
}
function handleRegister($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = sanitizeInput($data['username'] ?? '');
    $password = $data['password'] ?? '';
    if (empty($username) || empty($password)) {
        jsonResponse(['success' => false, 'error' => 'Заполните все поля']);
    }
    if (strlen($username) < 3) {
        jsonResponse(['success' => false, 'error' => 'Никнейм должен содержать минимум 3 символа']);
    }
    if (strlen($password) < 6) {
        jsonResponse(['success' => false, 'error' => 'Пароль должен содержать минимум 6 символов']);
    }
    $existing = $db->fetchOne("SELECT id FROM users WHERE username = ?", [$username]);
    if ($existing) {
        jsonResponse(['success' => false, 'error' => 'Пользователь с таким никнеймом уже существует']);
    }
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);
    $db->query("INSERT INTO users (username, password_hash) VALUES (?, ?)", [$username, $passwordHash]);
    $userId = $db->lastInsertId();
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $username;
    jsonResponse(['success' => true, 'username' => $username]);
}
function handleLogin($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = sanitizeInput($data['username'] ?? '');
    $password = $data['password'] ?? '';
    if (empty($username) || empty($password)) {
        jsonResponse(['success' => false, 'error' => 'Заполните все поля']);
    }
    $user = $db->fetchOne("SELECT * FROM users WHERE username = ?", [$username]);
    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonResponse(['success' => false, 'error' => 'Неверный никнейм или пароль']);
    }
    $db->query("UPDATE users SET last_login = NOW() WHERE id = ?", [$user['id']]);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    jsonResponse(['success' => true, 'username' => $user['username']]);
}
function handleLogout() {
    session_destroy();
    jsonResponse(['success' => true]);
}
function handleCheckAuth() {
    if (isLoggedIn()) {
        jsonResponse(['success' => true, 'username' => $_SESSION['username']]);
    } else {
        jsonResponse(['success' => false]);
    }
}
function handleSaveApiKey($db) {
    requireLogin();
    $data = json_decode(file_get_contents('php://input'), true);
    $apiName = sanitizeInput($data['apiName'] ?? '');
    $apiKey = $data['apiKey'] ?? '';
    $userId = getCurrentUserId();
    if (empty($apiName) || empty($apiKey)) {
        jsonResponse(['success' => false, 'error' => 'Заполните все поля']);
    }
    $existing = $db->fetchOne("SELECT id FROM api_keys WHERE user_id = ? AND api_name = ?", [$userId, $apiName]);
    if ($existing) {
        $db->query("UPDATE api_keys SET api_key = ? WHERE id = ?", [$apiKey, $existing['id']]);
    } else {
        $db->query("INSERT INTO api_keys (user_id, api_name, api_key) VALUES (?, ?, ?)", [$userId, $apiName, $apiKey]);
    }
    jsonResponse(['success' => true]);
}
function handleGetApiKeys($db) {
    requireLogin();
    $userId = getCurrentUserId();
    $keys = $db->fetchAll("SELECT api_name, api_key FROM api_keys WHERE user_id = ?", [$userId]);
    $result = [];
    foreach ($keys as $key) {
        $result[$key['api_name']] = $key['api_key'];
    }
    jsonResponse(['success' => true, 'keys' => $result]);
}
function handleSaveRequest($db) {
    requireLogin();
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = getCurrentUserId();
    $apiName = sanitizeInput($data['apiName'] ?? '');
    $requestName = sanitizeInput($data['requestName'] ?? '');
    $method = sanitizeInput($data['method'] ?? 'GET');
    $endpoint = $data['endpoint'] ?? '';
    $headers = json_encode($data['headers'] ?? []);
    $body = $data['body'] ?? '';
    $description = sanitizeInput($data['description'] ?? '');
    if (empty($requestName) || empty($endpoint)) {
        jsonResponse(['success' => false, 'error' => 'Заполните название и endpoint']);
    }
    $db->query(
        "INSERT INTO saved_requests (user_id, api_name, request_name, method, endpoint, headers, body, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [$userId, $apiName, $requestName, $method, $endpoint, $headers, $body, $description]
    );
    jsonResponse(['success' => true, 'id' => $db->lastInsertId()]);
}
function handleGetSavedRequests($db) {
    requireLogin();
    $userId = getCurrentUserId();
    $apiName = sanitizeInput($_GET['apiName'] ?? '');
    if ($apiName) {
        $requests = $db->fetchAll(
            "SELECT * FROM saved_requests WHERE (user_id = ? OR is_tutorial = 1) AND api_name = ? ORDER BY is_tutorial DESC, created_at DESC",
            [$userId, $apiName]
        );
    } else {
        $requests = $db->fetchAll(
            "SELECT * FROM saved_requests WHERE user_id = ? OR is_tutorial = 1 ORDER BY is_tutorial DESC, created_at DESC",
            [$userId]
        );
    }
    foreach ($requests as &$request) {
        $request['headers'] = json_decode($request['headers'], true);
    }
    jsonResponse(['success' => true, 'requests' => $requests]);
}
function handleDeleteRequest($db) {
    requireLogin();
    $data = json_decode(file_get_contents('php://input'), true);
    $requestId = intval($data['requestId'] ?? 0);
    $userId = getCurrentUserId();
    $db->query("DELETE FROM saved_requests WHERE id = ? AND user_id = ?", [$requestId, $userId]);
    jsonResponse(['success' => true]);
}
function handleProxyRequest($db) {
    requireLogin();
    $data = json_decode(file_get_contents('php://input'), true);
    $method = strtoupper($data['method'] ?? 'GET');
    $url = $data['url'] ?? '';
    $headers = $data['headers'] ?? [];
    $body = $data['body'] ?? '';
    $apiName = sanitizeInput($data['apiName'] ?? '');
    if (empty($url)) {
        jsonResponse(['success' => false, 'error' => 'URL не указан']);
    }
    if ($apiName) {
        $db->query(
            "INSERT INTO api_ratings (api_name, usage_count) VALUES (?, 1)
             ON DUPLICATE KEY UPDATE usage_count = usage_count + 1",
            [$apiName]
        );
    }
    $startTime = microtime(true);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $curlHeaders = [];
    foreach ($headers as $key => $value) {
        $curlHeaders[] = "$key: $value";
    }
    if (!empty($curlHeaders)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $curlHeaders);
    }
    if (!empty($body) && in_array($method, ['POST', 'PUT', 'PATCH'])) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }
    curl_setopt($ch, CURLOPT_HEADER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $responseTime = round((microtime(true) - $startTime) * 1000);
    if (curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);
        jsonResponse(['success' => false, 'error' => $error]);
    }
    curl_close($ch);
    $responseHeaders = substr($response, 0, $headerSize);
    $responseBody = substr($response, $headerSize);
    $userId = getCurrentUserId();
    $db->query(
        "INSERT INTO request_history (user_id, api_name, method, endpoint, status_code, response_time)
         VALUES (?, ?, ?, ?, ?, ?)",
        [$userId, $apiName, $method, $url, $httpCode, $responseTime]
    );
    jsonResponse([
        'success' => true,
        'statusCode' => $httpCode,
        'responseTime' => $responseTime,
        'response' => $responseBody,
        'headers' => $responseHeaders
    ]);
}
function handleGetApiRatings($db) {
    $ratings = $db->fetchAll("SELECT * FROM api_ratings ORDER BY usage_count DESC LIMIT 10");
    jsonResponse(['success' => true, 'ratings' => $ratings]);
}
function handleGetTutorials($db) {
    $apiName = sanitizeInput($_GET['apiName'] ?? '');
    if ($apiName) {
        $tutorials = $db->fetchAll(
            "SELECT * FROM saved_requests WHERE is_tutorial = 1 AND api_name = ? ORDER BY id",
            [$apiName]
        );
    } else {
        $tutorials = $db->fetchAll("SELECT * FROM saved_requests WHERE is_tutorial = 1 ORDER BY api_name, id");
    }
    foreach ($tutorials as &$tutorial) {
        $tutorial['headers'] = json_decode($tutorial['headers'], true);
    }
    jsonResponse(['success' => true, 'tutorials' => $tutorials]);
}
function handleGetRequestHistory($db) {
    requireLogin();
    $userId = getCurrentUserId();
    $limit = intval($_GET['limit'] ?? 50);
    $history = $db->fetchAll(
        "SELECT * FROM request_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?",
        [$userId, $limit]
    );
    jsonResponse(['success' => true, 'history' => $history]);
}