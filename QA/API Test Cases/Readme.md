# API TEST CASES

## API-TC-01 — Register new user successfully (201, token returned)

**Preconditions:**

- User with provided email does not exist

**Request:**

`POST /api/auth/register`

**Test Data (Body):**

```json
{
  "name": "Chioroglo Nichita",
  "email": "Nichita.new@test.com",
  "password": "Test1234",
  "confirmPassword": "Test1234"
}
```

**Expected Result:**

- HTTP Status: **201 Created**
- `success: true`
- Response `data` contains:
  - `token`
  - `expiresAt`
  - user object

## API-TC-02 — Register with duplicate email

**Preconditions:**

- User with email `john@test.com` already exists

**Request:**

`POST /api/auth/register`

**Test Data (Body):**

```json
{
  "name": "Nichita",
  "email": "Nichita@test.com",
  "password": "Test1234",
  "confirmPassword": "Test1234"
}
```

**Expected Result:**

- HTTP Status: **409 Conflict**
- `success: false`
- Error message indicates email already exists

## API-TC-03 — Register with invalid password (no digit)

**Preconditions:**

- Email is not registered

**Request:**

`POST /api/auth/register`

**Test Data (Body):**

```json
{ "name": "Nichita", "email": "abcd@test.com", "password": "abcdef", "confirmPassword": "abcdef" }
```

**Expected Result:**

- HTTP Status: **400 Bad Request**
- Password validation error is returned

## API-TC-04 — Login success returns auth token

**Preconditions:**

- User exists with valid credentials

**Request:**

`POST /api/auth/login`

**Test Data (Body):**

```json
{ "email": "Nichita@test.com", "password": "Test1234" }
```

**Expected Result:**

- HTTP Status: **200 OK**
- Response contains auth token
- `success: true`

## API-TC-05 — Login with invalid credentials

**Preconditions:**

- User exists

**Request:**

`POST /api/auth/login`

**Test Data (Body):**

```json
{ "email": "Nichita@test.com", "password": "WrongPass123" }
```

**Expected Result:**

- HTTP Status: **401 Unauthorized**
- `success: false`
- Error message is returned

## API-TC-06 — Get profile without authorization token

**Preconditions:**

- No Authorization header provided

**Request:**

`GET /api/auth/me`

**Expected Result:**

- HTTP Status: **401 Unauthorized**
- Access denied

## API-TC-07 — Get profile with invalid token

**Preconditions:**

- Authorization header contains invalid token

**Request Headers:**

`Authorization: Bearer invalid-token-123`

**Request:**

`GET /api/auth/me`

**Expected Result:**

- HTTP Status: **401 Unauthorized**

## API-TC-08 — Get profile with valid token

**Preconditions:**

- User is logged in
- Valid token exists

**Request Headers:**

`Authorization: Bearer <valid_token>`

**Request:**

`GET /api/auth/me`

**Expected Result:**

- HTTP Status: **200 OK**
- User data is returned

## API-TC-09 — Update user name successfully

**Preconditions:**

- User is authorized

**Request Headers:**

`Authorization: Bearer <valid_token>`

**Request:**

`PATCH /api/auth/me`

**Test Data (Body):**

```json
{ "name": "Updated Name" }
```

**Expected Result:**

- HTTP Status: **200 OK**
- User name is updated

## API-TC-10 — Update profile with invalid password

**Preconditions:**

- User is authorized

**Request:**

`PATCH /api/auth/me`

**Test Data (Body):**

```json
{ "password": "abcdef" }
```

**Expected Result:**

- HTTP Status: **400 Bad Request**
- Password validation error

## API-TC-11 — Update email to existing one

**Preconditions:**

- Another user exists with email `taken@test.com`

**Request:**

`PATCH /api/auth/me`

**Test Data (Body):**

```json
{ "email": "taken@test.com" }
```

**Expected Result:**

- HTTP Status: **409 Conflict**

## API-TC-12 — Logout successfully

**Preconditions:**

- User is authorized

**Request:**

`POST /api/auth/logout`

**Expected Result:**

- HTTP Status: **200 OK**
- `success: true`

## API-TC-13 — Logout without token

**Preconditions:**

- Authorization header is missing

**Request:**

`POST /api/auth/logout`

**Expected Result:**

- HTTP Status: **401 Unauthorized**

## API-TC-14 — Delete account successfully

**Preconditions:**

- User is authorized

**Request:**

`DELETE /api/auth/me`

**Expected Result:**

- HTTP Status: **200 OK**
- User account is deleted

## API-TC-15 — Access profile after account deletion

**Preconditions:**

- Account was deleted

**Request:**

`GET /api/auth/me`

**Expected Result:**

- HTTP Status: **401 Unauthorized**
- Access denied

## API-TC-16 — Get topics list

**Request:**

`GET /api/topics`

**Expected Result:**

- HTTP Status: **200 OK**
- Response contains **7 topics**

## API-TC-17 — Get topic with invalid slug

**Request:**

`GET /api/topics/invalid-slug`

**Expected Result:**

- HTTP Status: **404 Not Found**

## API-TC-18 — Get articles with invalid pagination

**Request:**

`GET /api/articles?page=0&limit=51`

**Expected Result:**

- HTTP Status: **400 Bad Request**

## API-TC-19 — Search without query parameter

**Request:**

`GET /api/search`

**Expected Result:**

- HTTP Status: **400 Bad Request**
- Error indicates missing `q` parameter

## API-TC-20 — Contact form message length boundary

**Request:**

`POST /api/contact`

**Test Data (Body):**

```json
{ "name": "Nichita", "email": "Nichita@test.com", "message": "123456789" }
```

**Expected Result:**

- HTTP Status: **400 Bad Request**

---

**Repeat with:**

```json
{ "message": "1234567890" }
```

**Expected Result:**

- HTTP Status: **200 OK**
