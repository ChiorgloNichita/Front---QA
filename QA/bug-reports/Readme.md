# Bug Reports

## **Bug 1 — Name validation does not accept valid length (2–50 characters)**

**Title:** Name field validation rejects valid input length (2–50 characters)

**Environment:**

- OS: Windows 11
- Browser: Chrome Version 144.0.7559.133 (Official Build) (64-bit)
- Device: Desktop
- Page: `/register`

**Preconditions:**

- User is on the Registration page
- Form is empty

**Steps to Reproduce:**

1. Open `/register`
2. Enter **2 characters** in the Name field (e.g. `Ns`)
3. Fill other fields with any valid data
4. Observe validation message
5. Enter **more than 50 characters** (e.g. 51 symbols)
6. Observe validation behavior

**Actual Result:**

- Validation error is shown even when name length is **2 characters**
- Validation error is also shown for **50 characters**, although UI message says max is 50

**Expected Result:**

- Name with **2–50 characters** should be accepted
- Error should appear **only** if length is `< 2` or `> 50`

**Severity:** Medium

**Priority:** Medium

**Status:** Open

![image.png](image.png)

![image.png](image%201.png)

**Notes:**

UI validation message contradicts actual validation logic.

## **Bug 2 — Logo is clipped on tablet resolutions (768–1023px)**

**Title:** Header logo is clipped on tablet viewport widths (768–1023px)

**Environment:**

- OS: Windows 11
- Browser: Chrome Version 144.0.7559.133 (Official Build) (64-bit) (DevTools responsive mode)
- Viewport: 768px – 1023px width
- Page: All pages with header

**Preconditions:**

- Open application in responsive mode

**Steps to Reproduce:**

1. Open any page (e.g. `/`)
2. Set viewport width to **768px**
3. Increase width up to **1023px**
4. Observe header logo

**Actual Result:**

- Logo is partially **cut off / clipped**
- Header layout breaks on tablet sizes

**Expected Result:**

- Logo should be fully visible on all breakpoints
- Header layout should adapt correctly for tablet resolutions

**Severity:** Medium

**Priority:** Medium

**Status:** Open

![image.png](image%202.png)

**Notes:**

Issue affects tablet UX and responsive layout consistency.

## **Bug 3 — Contact form name validation rejects valid input (≥2 characters)**

**Title:** Contact form name validation does not accept valid minimum length

**Environment:**

- OS: Windows 10
- Browser: Chrome Version 144.0.7559.133 (Official Build) (64-bit)
- Page: `/contact`

**Preconditions:**

- User is on Contact page

**Steps to Reproduce:**

1. Open `/contact`
2. Enter **2 characters** in Name field (e.g. `BB`)
3. Fill Email with valid address
4. Enter valid message (10+ characters)
5. Click **Submit**

**Actual Result:**

- Error message is displayed:
  _“Name must contain at least 2 characters”_
- Form submission is blocked

**Expected Result:**

- Name with **2 or more characters** should be accepted
- Form should submit successfully

**Severity:** Medium

**Priority:** Medium

**Status:** Open

![image.png](image%203.png)

**Notes:**

Validation behavior is inconsistent with displayed validation rules.

##
