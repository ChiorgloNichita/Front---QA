# UI - Test Cases

### UI-TC-01 — Register form validation on empty submit

**Preconditions:**

- User is not logged in

**Steps:**

1. Open `/register`
2. Click **Submit** without filling any fields

**Test Data:**

- All fields empty

**Expected Result:**

- Validation errors are displayed for all required fields

### UI-TC-02— Register validation: password must contain letter and digit

**Preconditions:**

- User is not logged in

**Steps:**

1. Open `/register`
2. Fill the registration form
3. Click **Submit**

**Test Data (Variant 1):**

- Name: `John`
- Email: `john@test.com`
- Password: `abcdef`
- Confirm Password: `abcdef`

**Expected Result:**

- Password validation error is displayed (missing digit)

**Test Data (Variant 2):**

- Password: `123456`
- Confirm Password: `123456`

**Expected Result:**

- Password validation error is displayed (missing letter)

### UI-TC-03 — Successful registration does not store auth token

**Preconditions:**

- User is not logged in

**Steps:**

1. Open `/register`
2. Fill all fields with valid data
3. Click **Submit**

**Test Data:**

- Name: `John Doe`
- Email: `john.unique@test.com`
- Password: `Test1234`
- Confirm Password: `Test1234`

**Expected Result:**

- Registration is successful
- `auth_token` is **NOT** stored in localStorage

### UI-TC-04 — Login with invalid credentials

**Preconditions:**

- User with given email exists
- User is not logged in

**Steps:**

1. Open `/login`
2. Enter email and invalid password
3. Click **Submit**

**Test Data:**

- Email: `john@test.com`
- Password: `wrongPassword`

**Expected Result:**

- Error message is displayed
- API returns **401 Unauthorized**
- localStorage remains empty

### UI-TC-05 — Successful login stores auth data and redirects to profile

**Preconditions:**

- User exists
- User is not logged in

**Steps:**

1. Open `/login`
2. Enter valid credentials
3. Click **Submit**

**Test Data:**

- Email: `john@test.com`
- Password: `Test1234`

**Expected Result:**

- User is redirected to `/profile`
- localStorage contains:
  - `auth_token`
  - `auth_user` (valid JSON)

### UI-TC-06 — Accessing profile without token redirects to login

**Preconditions:**

- localStorage is empty

**Steps:**

1. Open `/profile`

**Test Data:**

- N/A

**Expected Result:**

- User is redirected to `/login`

### UI-TC-07 — Invalid token redirects user to login

**Preconditions:**

- `auth_token=invalid-token-123` is set in localStorage

**Steps:**

1. Open `/profile`

**Test Data:**

- auth_token: `invalid-token-123`

**Expected Result:**

- API `/api/auth/me` returns 401
- User is redirected to `/login`

### UI-TC-08 — User session persists after page refresh

**Preconditions:**

- User is logged in

**Steps:**

1. Open `/profile`
2. Refresh the page

**Test Data:**

- Valid auth token in localStorage

**Expected Result:**

- User remains logged in
- Profile page loads correctly

### UI-TC-9 — Logout clears localStorage and blocks profile access

**Preconditions:**

- User is logged in

**Steps:**

1. Open `/profile`
2. Click **Logout**
3. Try to open `/profile` again

**Test Data:**

- Valid logged-in user

**Expected Result:**

- localStorage is cleared
- User is redirected to `/login`

## UI-TC-11 — Delete account flow

**Preconditions:**

- User is logged in
- User is on `/profile` page

**Steps:**

1. Open `/profile`
2. Click **Delete account**
3. Confirm deletion (if confirmation dialog is implemented)

**Test Data:**

- Valid logged-in user
- Valid `auth_token` in localStorage

**Expected Result:**

- Account is deleted successfully
- localStorage is cleared (`auth_token`, `auth_user`)
- User is redirected to `/register`
- Access to `/profile` is no longer possible

## UI-TC-12 — Home page content loads correctly

**Preconditions:**

- User is on Home page

**Steps:**

1. Open `/`

**Test Data:**

- N/A

**Expected Result:**

- Topics section is displayed
- Latest articles section is displayed
- All visible links are clickable and work correctly

## UI-TC-13 — Topics list and navigation

**Preconditions:**

- User is on Topics page

**Steps:**

1. Open `/topics`
2. Click on any topic card

**Test Data:**

- Existing topic slug

**Expected Result:**

- User is navigated to `/topics/[slug]`
- List of articles for selected topic is displayed

## UI-TC-14 — Invalid topic slug opens not-found page

**Preconditions:**

- N/A

**Steps:**

1. Open `/topics/invalid-123`

**Test Data:**

- Invalid topic slug: `invalid-123`

**Expected Result:**

- Not-found (404) page is displayed

## UI-TC-15 — Article page renders markdown and code highlighting

**Preconditions:**

- Article with markdown content and code blocks exists

**Steps:**

1. Open `/articles/[valid-slug]`

**Test Data:**

- Valid article slug with code block

**Expected Result:**

- Markdown content is rendered correctly (headings, lists, links)
- Code blocks are highlighted correctly using Shiki

## UI-TC-16 — Copy code button copies code correctly

**Preconditions:**

- Article page contains code block with Copy button

**Steps:**

1. Open article page
2. Click **Copy** button on code block
3. Paste copied content into any text editor

**Test Data:**

- Article with code block

**Expected Result:**

- Only code content is copied
- No extra characters or formatting are added

## UI-TC-17 — Table of Contents navigation works correctly

**Preconditions:**

- Article contains multiple headings
- TOC is displayed

**Steps:**

1. Open article page
2. Click any item in the Table of Contents

**Test Data:**

- Article with headings

**Expected Result:**

- Page scrolls to the corresponding section
- Section header is aligned correctly

## UI-TC-18 — Search page deep link opens results

**Preconditions:**

- Articles matching search query exist

**Steps:**

1. Open `/search?q=typescript`

**Test Data:**

- Search query: `typescript`

**Expected Result:**

- Search input is populated with query
- Relevant search results are displayed immediately

## UI-TC-19 — Search pagination works correctly

**Preconditions:**

- Search query returns **multiple results** (pagination is available)

**Steps:**

1. Open `/search?q=js`
2. Click **Next** pagination button

**Test Data:**

- Search query: `js`

**Expected Result:**

- Next page of results is displayed
- Maximum 6 results are shown per page
- Search query remains unchanged

## UI-TC-20 — Contact form message length validation (boundary values)

**Preconditions:**

- User is on Contact page

**Steps:**

1. Open `/contact`
2. Enter valid name and email
3. Enter message with **9 characters**
4. Click **Submit**
5. Update message to **10 characters**
6. Click **Submit**

**Test Data:**

- Name: `John`
- Email: `john@test.com`
- Message (invalid): `123456789`
- Message (valid): `1234567890`

**Expected Result:**

- Error message is shown for message with less than 10 characters
- Form is successfully submitted with message of 10 or more characters
