# Test plan

**Project:** Frontend Learning Hub (Next.js App Router)

**Goal:** Проверить, что UI и API работают корректно: контент (темы/статьи), поиск, контакты, авторизация (register/login), protected `/profile`, корректные редиректы, хранение токена в localStorage, обработка ошибок и валидация.

### **1 Scope — что тестируем**

**UI (Web):**

- Публичные страницы: `/`, `/topics`, `/topics/[slug]`, `/articles/[slug]`, `/search`, `/about`, `/contact`
- Auth UI: `/register`, `/login`
- Protected: `/profile` (GET `/api/auth/me` при загрузке)
- UI элементы: dark/light theme, skeleton/loading, scroll-to-top, breadcrumbs, TOC, progress bar, copy code, not-found/error pages
- Адаптивность: mobile/desktop, минимум Chrome + Firefox

**API:**

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET/PATCH/DELETE /api/auth/me`, `POST /api/auth/logout`, `GET /api/auth/users`
- Content: `GET /api/topics`, `GET /api/topics/:slug`, `GET /api/articles`, `GET /api/articles/:slug`
- Search: `GET /api/search`
- Contact: `POST /api/contact`, `GET /api/contact`
- Stats: `GET /api/stats`

### **2 Out of scope**

- Нагрузочное тестирование (только при желании спот‑проверки)
- Глубокий security/pentest (только типовые проверки авторизации/401/409)
- Email/integrations (если не реализованы)

### **3 Типы тестирования**

- Functional UI
- Smoke / Regression
- API (positive/negative, boundary, auth)
- Compatibility (Chrome/Firefox, mobile viewport)

### **4 Test environment**

- Base URL: `http://localhost:3000`
- Токен: Bearer token в API; в UI хранится в localStorage:
  - `auth_token`
  - `auth_user`

### **5 Test data**

- Users:
  - New user: уникальный email
  - Existing user: email уже зарегистрирован
  - Invalid token: `invalid-token-123`
- Auth validation:
  - name 2–50
  - password 6–100, минимум 1 буква + 1 цифра
- Contact validation:
  - name 2–50
  - message 10–1000

### **6 Entry / Exit criteria**

**Entry:** приложение запускается, API отвечает.

**Exit:** пройдены smoke + ключевые сценарии (auth/profile/search/contact), нет критических дефектов (логин/профиль/поиск/навигация).

##
