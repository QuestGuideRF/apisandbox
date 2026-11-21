<div align="center">

# 🚀 API-Песочница

### Интерактивная платформа для визуального тестирования API без программирования

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PHP](https://img.shields.io/badge/PHP-7.4+-purple.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Визуально создавайте, тестируйте и изучайте REST API запросы**

[Возможности](#-основные-возможности) • [Установка](#-установка) • [Использование](#-как-пользоваться) • [Документация](#-документация)

</div>

---

## 📖 О проекте

**API-Песочница** — это современная веб-платформа, созданная для обучения и тестирования популярных API. Проект позволяет работать с REST API через визуальный интерфейс без необходимости писать код.

### 🎯 Для кого этот проект?

- 👨‍🎓 **Начинающим разработчикам** — изучение REST API и HTTP протоколов
- 🧪 **Тестировщикам** — быстрая проверка API endpoints
- 👨‍💻 **Разработчикам** — тестирование API-ключей и интеграций
- 🎓 **Студентам** — практическое изучение веб-разработки
- 📚 **Преподавателям** — демонстрация работы с API на уроках

### ✨ Главная особенность

**Всё работает без написания кода!** Визуальный конструктор позволяет:
- Формировать HTTP-запросы через удобный интерфейс
- Видеть в реальном времени, как формируется запрос
- Получать и анализировать ответы API
- Сохранять и повторно использовать готовые запросы

---

## 🎯 Основные возможности

### 🔧 Конструктор HTTP-запросов

```
┌─────────────────────────────────────────┐
│  📡 Выберите API: [OpenAI ▼]           │
├─────────────────────────────────────────┤
│  🔑 API Ключ: [••••••••] [Сохранить]   │
├─────────────────────────────────────────┤
│  🔧 Конструктор запроса                │
│  Метод: [GET ▼]                         │
│  Endpoint: [https://api...]            │
│  Headers: {JSON редактор}              │
│  Body: {JSON редактор}                 │
├─────────────────────────────────────────┤
│  [🚀 Отправить запрос]                 │
└─────────────────────────────────────────┘
```

**Возможности:**
- ✅ Выбор HTTP-метода (GET, POST, PUT, DELETE, PATCH)
- ✅ Редактирование endpoint URL с подстановкой ключей
- ✅ Настройка заголовков (headers) через JSON-редактор
- ✅ Редактирование тела запроса (body)
- ✅ Предпросмотр сформированного запроса
- ✅ Автоматическая подстановка API-ключей

### 📚 Образовательные материалы

- 📖 **Готовые учебные сценарии** для каждого API
- 💡 **Интерактивные подсказки** с объяснениями концепций
- 📝 **Примеры реальных запросов** с подробными комментариями
- 🎓 **Обучение** базовым понятиям (endpoint, headers, body, status codes)

### 💾 Персональный кабинет

- 👤 **Регистрация и авторизация** с безопасным хранением паролей
- 🔐 **Безопасное хранение API-ключей** в зашифрованной базе данных
- 📁 **Библиотека запросов** — сохраняйте и повторно используйте запросы
- 📊 **История запросов** — все ваши запросы с результатами
- ⭐ **Рейтинг API** — статистика использования

### 🎨 Современный интерфейс

- 🌞 **Светлая тема** — для работы днём
- 🌙 **Тёмная тема** — для комфортной работы ночью
- 🌓 **Системная тема** — автоматический выбор по ОС
- 📱 **Адаптивный дизайн** — работает на всех устройствах
- ✨ **Плавные анимации** и переходы

---

## 📁 Структура проекта

```
api-sandbox/
│
├── 📄 index.html              # Главная страница (SPA)
├── 🎨 styles.css              # Стили с поддержкой тем
├── ⚙️ script.js               # JavaScript логика и конфигурации API
│
├── 🔧 config.php              # Конфигурация и Database класс
├── 🌐 api.php                 # REST API endpoints (13 endpoints)
├── 💾 database.sql            # Структура БД (5 таблиц)
│
├── 🔒 .htaccess              # Apache конфигурация и безопасность
│
├── 📄 404.html               # Страница ошибки 404
├── 📄 405.html               # Страница ошибки 405
├── 📄 500.html               # Страница ошибки 500
│
├── 🤖 robots.txt             # Правила для поисковых роботов
├── 🗺️ sitemap.xml            # Карта сайта
├── 🎯 favicon.svg            # Иконка сайта (SVG)
├── 📱 site.webmanifest       # PWA манифест
│
└── 📚 README.md              # Документация (этот файл)
```

### 📊 Детальная структура файлов

#### Frontend (Клиентская часть)
- **index.html** - Одностраничное приложение с модальными окнами
- **styles.css** - CSS с переменными для тем, адаптивный дизайн
- **script.js** - Управление состоянием, конфигурации API, AJAX запросы

#### Backend (Серверная часть)
- **config.php** - Конфигурация БД, Database класс (Singleton), утилиты
- **api.php** - 13 REST API endpoints для работы с БД и прокси запросов

#### Database (База данных)
- **database.sql** - 5 таблиц: users, api_keys, saved_requests, api_ratings, request_history

#### SEO и безопасность
- **robots.txt** - Правила для поисковых роботов
- **sitemap.xml** - XML карта сайта
- **404/405/500.html** - Пользовательские страницы ошибок
- **.htaccess** - Безопасность, SSL/WWW редиректы, обработка ошибок

---

## 🛠️ Технологии

### Frontend
- **HTML5** - семантическая разметка, доступность
- **CSS3** - CSS переменные, flexbox, grid, анимации
- **JavaScript (ES6+)** - async/await, Fetch API, localStorage

### Backend
- **PHP 7.4+** - объектно-ориентированный код, PDO
- **MySQL 8.0** - реляционная БД, индексы, foreign keys

### Архитектура
- **SPA (Single Page Application)** - весь UI в одном HTML файле
- **RESTful API** - JSON API для обмена данными
- **PDO Prepared Statements** - защита от SQL-инъекций

---

## 📦 Установка

### ⚙️ Системные требования

- ✅ **PHP** 7.4 или выше (рекомендуется PHP 8.0+)
- ✅ **MySQL** 8.0 или выше
- ✅ **Веб-сервер** Apache 2.4+ или Nginx 1.18+
- ✅ **PHP расширения:** PDO, PDO_MySQL, cURL, JSON, mbstring

### 📝 Пошаговая установка

#### Шаг 1: Загрузка файлов

Загрузите все файлы проекта на ваш веб-сервер в корневую директорию (например, `public_html/` или `/var/www/html/`).

#### Шаг 2: Создание базы данных

1. **Создайте базу данных:**
```sql
CREATE DATABASE change_me
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

2. **Создайте пользователя БД:**
```sql
CREATE USER 'change_me'@'localhost'
IDENTIFIED BY 'change_me';

GRANT ALL PRIVILEGES ON change_me.*
TO 'change_me'@'localhost';

FLUSH PRIVILEGES;
```

3. **Импортируйте структуру БД:**

**Через phpMyAdmin:**
- Выберите базу `u3307679_APISandbox`
- Вкладка "Импорт"
- Выберите файл `database.sql`
- Нажмите "Вперёд"

**Через командную строку:**
```bash
mysql -u change_me -p change_me < database.sql
```

#### Шаг 3: Настройка конфигурации

Откройте файл `config.php` и проверьте параметры подключения:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'change_me');
define('DB_PASS', 'change_me');
define('DB_NAME', 'change_me');
```

**⚠️ Важно:** Для продакшена измените пароли на более сложные!

#### Шаг 4: Настройка прав доступа

Установите права на файлы:

```bash
chmod 755 -R /path/to/project
chmod 644 *.html *.css *.js
```

#### Шаг 5: Настройка HTTPS (рекомендуется)

Для безопасной работы с API-ключами:

1. Установите SSL сертификат (Let's Encrypt - бесплатно)
2. В `.htaccess` раскомментируйте SSL редирект (строки 9-10):
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
3. В `config.php` измените:
```php
ini_set('session.cookie_secure', 1); // Было 0
```

#### Шаг 6: Проверка установки

1. Откройте сайт в браузере
2. Вы должны увидеть страницу авторизации
3. Зарегистрируйтесь и войдите
4. Попробуйте отправить тестовый запрос к GitHub API

**✅ Если всё работает — установка завершена!**

---

## 🚀 Как пользоваться

### 📱 Первый запуск

1. **Откройте сайт** в браузере
2. **Зарегистрируйтесь:**
   - Никнейм: минимум 3 символа
   - Пароль: минимум 6 символов
3. **Войдите** в систему

### 🔧 Работа с API

#### Базовый сценарий:

```
1. Выберите API из списка (например, GitHub)
   ↓
2. Введите API-ключ (опционально, для публичных данных не нужен)
   ↓
3. Настройте запрос:
   - Метод: GET
   - Endpoint: https://api.github.com/users/octocat
   - Headers: {"Accept": "application/vnd.github.v3+json"}
   ↓
4. Нажмите "🚀 Отправить запрос"
   ↓
5. Просмотрите ответ:
   - JSON с данными пользователя
   - Статус-код: 200 OK
   - Время выполнения: 123 ms
```

#### Расширенный сценарий:

1. **Сохраните API-ключ** — нажмите "Сохранить" рядом с полем ключа
2. **Используйте плейсхолдеры:**
   - `{API_KEY}` или `{TOKEN}` автоматически заменятся на ваш ключ
   - Пример: `Authorization: Bearer {API_KEY}`
3. **Сохраните запрос:**
   - После настройки нажмите "💾 Сохранить"
   - Введите название и описание
   - Запрос будет доступен во вкладке "Сохранённые"

### 📚 Учебные сценарии

1. Перейдите во вкладку **"📚 Обучение"**
2. Выберите интересующий API
3. Кликните на любой учебный сценарий
4. Запрос автоматически загрузится в песочницу
5. Подставьте свой API-ключ и отправьте

### 📊 Статистика и история

- **Рейтинг API** — какие API используются чаще всего
- **История запросов** — все ваши запросы с результатами
- **Статус-коды** — успешные и неудачные запросы

---

## 🔑 Получение API-ключей

### 🤖 OpenAI (ChatGPT)

1. Зайдите на https://platform.openai.com/api-keys
2. Войдите в аккаунт или создайте новый
3. Нажмите "Create new secret key"
4. Скопируйте ключ (формат: `sk-...`)
5. **⚠️ Сохраните ключ сразу — он больше не отобразится!**

### 📱 Telegram Bot

1. Откройте Telegram и найдите бота **@BotFather**
2. Отправьте команду `/newbot`
3. Введите имя бота (например: "My Test Bot")
4. Введите username (должен заканчиваться на `_bot`)
5. Скопируйте полученный токен

### 🐙 GitHub

1. Зайдите на https://github.com
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Выберите права (например: `public_repo`, `read:user`)
5. Скопируйте токен (формат: `ghp_...`)

### 💬 VK API

1. Зайдите на https://vk.com/dev
2. Создайте Standalone-приложение
3. Получите токен доступа через OAuth
4. Используйте токен в запросах

---

### 🔐 Безопасность

#### Хеширование паролей:
```php
// В api.php при регистрации
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// При авторизации
password_verify($password, $user['password_hash'])
```

#### Защита от SQL-инъекций:
```php
// Всегда используем prepared statements
$stmt = $db->query("SELECT * FROM users WHERE username = ?", [$username]);
```

#### XSS защита:
```php
// Санитизация вывода
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}
```

### 🎨 Система тем

```css
/* CSS переменные для светлой темы */
:root {
    --bg-primary: #ffffff;
    --text-primary: #2d3748;
    /* ... */
}

/* Переопределение для тёмной темы */
[data-theme="dark"] {
    --bg-primary: #1a202c;
    --text-primary: #f7fafc;
    /* ... */
}
```

JavaScript переключает атрибут `data-theme` на `<html>` элементе.

### 📊 База данных

#### Таблицы:

1. **users** — пользователи системы
   - `id`, `username`, `password_hash`, `created_at`, `last_login`

2. **api_keys** — API ключи пользователей
   - `id`, `user_id`, `api_name`, `api_key`, `created_at`, `updated_at`
   - Foreign key на `users` с CASCADE DELETE

3. **saved_requests** — сохранённые запросы
   - `id`, `user_id`, `api_name`, `request_name`, `method`, `endpoint`, `headers`, `body`, `description`, `is_tutorial`
   - `is_tutorial = 1` для учебных сценариев

4. **api_ratings** — статистика использования API
   - `id`, `api_name`, `usage_count`, `last_used`

5. **request_history** — история запросов
   - `id`, `user_id`, `api_name`, `method`, `endpoint`, `status_code`, `response_time`, `created_at`

#### Индексы для оптимизации:
- `idx_username` — быстрый поиск пользователей
- `idx_user_api` — поиск ключей по пользователю и API
- `idx_user_requests` — запросы пользователя
- `idx_usage_count` — сортировка рейтинга
- `idx_user_history` — история пользователя

---

## 🌐 Поддерживаемые API

| API | Описание | Endpoint пример | Требует ключ |
|-----|----------|----------------|--------------|
| 🤖 **OpenAI** | ChatGPT, DALL-E | `/v1/chat/completions` | ✅ Да |
| 📱 **Telegram** | Bot API | `/bot{TOKEN}/getMe` | ✅ Да |
| 💬 **VK** | VK API | `/method/users.get` | ✅ Да |
| 🐙 **GitHub** | REST API | `/users/{username}` | ⚠️ Опционально |
| 🎮 **Discord** | Bot API | `/users/@me` | ✅ Да |
| 🐦 **Twitter** | API v2 | `/2/users/me` | ✅ Да |
| 🗺️ **Google Maps** | Geocoding | `/geocode/json` | ✅ Да |
| 💳 **Stripe** | Payment API | `/v1/customers` | ✅ Да |
| 🎵 **Spotify** | Web API | `/v1/me` | ✅ Да |
| 📺 **YouTube** | Data API v3 | `/v3/search` | ✅ Да |

---

## 🔒 Безопасность

### ✅ Реализованные меры:

- 🔐 **Хеширование паролей** — bcrypt алгоритм
- 🛡️ **SQL Injection защита** — PDO prepared statements
- 🚫 **XSS защита** — htmlspecialchars для вывода
- 🍪 **Безопасные сессии** — HTTP-only cookies
- 🔒 **Защита файлов** — .htaccess блокирует доступ к config.php
- 🔐 **CORS настройки** — корректная обработка в api.php
- 🛡️ **Заголовки безопасности** — X-Content-Type-Options, X-Frame-Options

### ⚠️ Рекомендации для продакшена:

1. **Используйте HTTPS** — обязательно для работы с API-ключами
2. **Смените пароли БД** — используйте сложные пароли
3. **Регулярные бэкапы** — настройте автоматическое резервное копирование
4. **Логирование** — включите логирование ошибок PHP
5. **Ограничение доступа** — используйте файрвол для БД

---

## 📝 Примеры использования

### Пример 1: Telegram Bot - Отправка сообщения

```
API: Telegram
Method: POST
Endpoint: https://api.telegram.org/bot{TOKEN}/sendMessage

Headers:
{
  "Content-Type": "application/json"
}

Body:
{
  "chat_id": "123456789",
  "text": "Привет из API-Песочницы! 🚀",
  "parse_mode": "HTML"
}
```

**Результат:** Бот отправит сообщение в указанный чат.

### Пример 2: OpenAI - ChatGPT запрос

```
API: OpenAI
Method: POST
Endpoint: https://api.openai.com/v1/chat/completions

Headers:
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {API_KEY}"
}

Body:
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "Ты полезный ассистент"
    },
    {
      "role": "user",
      "content": "Расскажи анекдот про программистов"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

**Результат:** ChatGPT вернёт ответ в формате JSON.

### Пример 3: GitHub - Получение информации о пользователе

```
API: GitHub
Method: GET
Endpoint: https://api.github.com/users/octocat

Headers:
{
  "Accept": "application/vnd.github.v3+json"
}
```

**Результат:** JSON с публичной информацией о пользователе GitHub.

---

## 🐛 Решение проблем

### ❌ Ошибка подключения к БД

**Симптомы:** "Access denied for user" или "Connection refused"

**Решения:**
1. Проверьте параметры в `config.php`
2. Убедитесь, что MySQL сервис запущен: `sudo systemctl status mysql`
3. Проверьте права пользователя БД
4. Проверьте, что порт 3306 доступен

### ❌ API запросы не работают

**Симптомы:** Запросы возвращают ошибки или таймауты

**Решения:**
1. Проверьте, что расширение cURL включено: `php -m | grep curl`
2. Проверьте правильность API-ключа
3. Убедитесь, что endpoint URL корректен
4. Проверьте логи сервера

### ❌ CORS ошибки

**Симптомы:** "Access-Control-Allow-Origin" ошибки в консоли

**Решения:**
- Используйте прокси через `api.php` (уже встроен)
- Проверьте заголовки CORS в `api.php` (строки 7-9)

### ❌ Страница не загружается

**Симптомы:** Белый экран или ошибка 500

**Решения:**
1. Проверьте права на файлы: `chmod 755 -R *`
2. Проверьте логи Apache/Nginx
3. Убедитесь, что PHP работает: `php -v`
4. Проверьте синтаксис `.htaccess`

---

## 📚 Дополнительные материалы

### 🎓 Обучающие ресурсы

- [REST API Tutorial](https://restfulapi.net/) — основы REST API
- [HTTP Methods](https://developer.mozilla.org/ru/docs/Web/HTTP/Methods) — описание HTTP методов
- [JSON Format](https://www.json.org/json-ru.html) — документация JSON

### 📖 Документация API провайдеров

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [GitHub REST API](https://docs.github.com/en/rest)
- [VK API Documentation](https://dev.vk.com/reference)

### 🛠️ Инструменты разработчика

- [Postman](https://www.postman.com/) — альтернативный инструмент
- [cURL](https://curl.se/) — командная строка для API
- [JSON Formatter](https://jsonformatter.org/) — форматирование JSON

---

## Настройка конфигурации

Файл `config.php` с реальными секретами не должен храниться в git. Для настройки используйте `config.example.php`.

1. Скопируйте `config.example.php` в `config.php`.
2. Подставьте свои `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`.
3. Убедитесь, что `config.php` не попадает в git.

Пример:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'change_me');
define('DB_PASS', 'change_me');
define('DB_NAME', 'change_me');
define('DB_CHARSET', 'utf8mb4');
```

---

Автор: legenda  
Telegram: [@LEGENDA_SD](https://t.me/LEGENDA_SD)
