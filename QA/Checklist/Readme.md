# Checklists

| ID  | Module                   | Check                                                                  | Status | Notes                                                              |
| --- | ------------------------ | ---------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| A1  | Smoke + basic navigation | Home page (`/`) opens without critical console errors                  | passed |                                                                    |
| A2  | Smoke + basic navigation | Header is visible and all header links are clickable                   | passed |                                                                    |
| A3  | Smoke + basic navigation | Navigation via main links does not result in 404 errors                | passed |                                                                    |
| A4  | Smoke + basic navigation | Footer is displayed correctly and does not overlap content             | passed |                                                                    |
| A5  | Smoke + basic navigation | External links open correctly in a new tab                             | passed |                                                                    |
| A6  | Smoke + basic navigation | Hover and focus states are visible for buttons and links               | passed |                                                                    |
| A7  | Smoke + basic navigation | Skeleton/loading states appear and disappear correctly                 | passed |                                                                    |
| B1  | Theme / UI state         | Theme toggle switches between light and dark modes                     | passed |                                                                    |
| B2  | Theme / UI state         | Selected theme persists when navigating between pages                  | passed |                                                                    |
| B3  | Theme / UI state         | Selected theme persists after page refresh                             | passed |                                                                    |
| B4  | Theme / UI state         | Text and links are readable in dark theme                              | passed |                                                                    |
| B5  | Theme / UI state         | Code blocks are readable in both light and dark themes                 | passed |                                                                    |
| B6  | Theme / UI state         | UI components are visually correct in both themes                      | passed |                                                                    |
| C1  | Home                     | Hero section is displayed correctly without layout issues              | passed |                                                                    |
| C2  | Home                     | Statistics section is displayed and values are not empty or NaN        | passed |                                                                    |
| C3  | Home                     | All 7 topic cards are displayed on the Home page                       | passed |                                                                    |
| C4  | Home                     | Clicking a topic card navigates to `/topics/[slug]`                    | passed |                                                                    |
| C5  | Home                     | “Latest articles” section is displayed                                 | passed |                                                                    |
| C6  | Home                     | Clicking an article navigates to `/articles/[slug]`                    | passed |                                                                    |
| C7  | Home                     | Search on Home page (if present) redirects to search results correctly | passed |                                                                    |
| D1  | Topics                   | `/topics` page displays all 7 topics                                   | passed |                                                                    |
| D2  | Topics                   | Each topic displays correct name and description (if provided)         | passed |                                                                    |
| D3  | Topics                   | `/topics/[slug]` displays articles only for the selected topic         | passed |                                                                    |
| D4  | Topics                   | Empty state is displayed correctly for topics without articles         | passed |                                                                    |
| D5  | Topics                   | Invalid topic slug opens not-found (404 UI) page                       | passed |                                                                    |
| D6  | Topics                   | Browser back/forward navigation does not break the page                | passed |                                                                    |
| E1  | Article                  | Valid article slug opens the article page                              | passed |                                                                    |
| E2  | Article                  | Invalid article slug opens not-found page                              | passed |                                                                    |
| E3  | Article                  | Markdown content renders correctly (headings, lists, links)            | passed |                                                                    |
| E4  | Article                  | Code blocks are highlighted correctly (Shiki)                          | passed |                                                                    |
| E5  | Article                  | Copy code button copies only code without extra characters             | passed |                                                                    |
| E6  | Article                  | Copy confirmation is shown (toast/label), if implemented               | passed |                                                                    |
| E7  | Article                  | Table of Contents (TOC) is displayed when article has headings         | passed |                                                                    |
| E8  | Article                  | Clicking TOC item scrolls to the correct section                       | passed |                                                                    |
| E9  | Article                  | Reading progress bar updates correctly on scroll                       | passed |                                                                    |
| E10 | Article                  | Breadcrumbs are correct and clickable                                  | passed |                                                                    |
| E11 | Article                  | Scroll-to-top button works on long articles                            | passed |                                                                    |
| E12 | Article                  | Mobile layout is not broken (TOC/code/buttons stay within screen)      | falled | Header logo is clipped on tablet viewport widths (768–1023px)      |
| F1  | Search                   | `/search` page opens successfully                                      | passed |                                                                    |
| F2  | Search                   | Search by title returns relevant results                               | passed |                                                                    |
| F3  | Search                   | Search by description returns results (if implemented)                 | passed |                                                                    |
| F4  | Search                   | Search by tags returns results (if implemented)                        | passed |                                                                    |
| F5  | Search                   | Search by content works and result ranking looks reasonable            | passed |                                                                    |
| F6  | Search                   | Debounce works (results do not update on every keystroke instantly)    | passed |                                                                    |
| F7  | Search                   | Search query is synced with URL (`?q=`)                                | passed |                                                                    |
| F8  | Search                   | Direct link `/search?q=...` displays results immediately               | passed |                                                                    |
| F9  | Search                   | Clearing search resets results and URL (if implemented)                | passed |                                                                    |
| F10 | Search                   | Pagination shows maximum 6 results per page                            | passed |                                                                    |
| F11 | Search                   | Next / Previous pagination buttons work correctly                      | passed |                                                                    |
| F12 | Search                   | Navigating to page=2 does not break search query                       | passed |                                                                    |
| F13 | Search                   | “No results” empty state is displayed correctly                        | passed |                                                                    |
| F14 | Search                   | Search trims leading/trailing spaces (e.g. `" react "` → `react`)      | passed |                                                                    |
| F15 | Search                   | Long queries, special characters and Cyrillic input do not crash UId   | passed |                                                                    |
| G1  | Contact                  | `/contact` page opens and form is visible                              | passed |                                                                    |
| G2  | Contact                  | Submitting empty form shows required field errors                      | passed |                                                                    |
| G3  | Contact                  | Name validation works for boundary values (1/2/50/51 chars)            | falled | Contact form name validation does not accept valid minimum length  |
| G4  | Contact                  | Email validation works for valid and invalid formats                   | passed |                                                                    |
| G5  | Contact                  | Message validation works for boundary values (9/10/1000/1001 chars)    | passed |                                                                    |
| G6  | Contact                  | Submit button is disabled/loading during submission                    | passed |                                                                    |
| G7  | Contact                  | Successful submission shows success notification                       | passed |                                                                    |
| G8  | Contact                  | Form is cleared after successful submission (if implemented)           | passed |                                                                    |
| G9  | Contact                  | API error (e.g. 400) is shown to user in a clear way                   | passed |                                                                    |
| H1  | Auth / Register          | `/register` page opens                                                 | passed |                                                                    |
| H2  | Auth / Register          | Submitting empty form shows validation errors                          | passed |                                                                    |
| H3  | Auth / Register          | Name validation works for 2–50 characters                              | falled | Name field validation rejects valid input length (2–50 characters) |
| H4  | Auth / Register          | Email format validation works correctly                                | passed |                                                                    |
| H5  | Auth / Register          | Password length validation works (<6, 6, >100)                         | passed |                                                                    |
| H6  | Auth / Register          | Password without digit is rejected                                     | passed |                                                                    |
| H7  | Auth / Register          | Password without letter is rejected                                    | passed |                                                                    |
| H8  | Auth / Register          | Confirm password mismatch shows error                                  | passed |                                                                    |
| H9  | Auth / Register          | Successful registration returns 201 and shows success message          | passed |                                                                    |
| H10 | Auth / Register          | Auth token is saved after registration                                 | passed |                                                                    |
| H11 | Auth / Register          | Registration with existing email returns 409 error                     | passed |                                                                    |
| H12 | Auth / Register          | Double submit does not create duplicate registrations                  | passed |                                                                    |
| I1  | Auth / Login             | `/login` page opens                                                    | passed |                                                                    |
| I2  | Auth / Login             | Submitting empty form shows validation errors                          | passed |                                                                    |
| I3  | Auth / Login             | Invalid credentials return 401 with clear error                        | passed |                                                                    |
| I4  | Auth / Login             | Successful login returns auth token                                    | passed |                                                                    |
| I5  | Auth / Login             | localStorage stores valid `auth_token` and `auth_user`                 | passed |                                                                    |
| I6  | Auth / Login             | User is redirected to `/profile` after login                           | passed |                                                                    |
| I7  | Auth / Login             | Double submit does not trigger duplicate login requests                | passed |                                                                    |
| I8  | Auth / Login             | Session persists after page refresh                                    | passed |                                                                    |
| J1  | Profile                  | Accessing `/profile` without token redirects to `/login`               | passed |                                                                    |
| J2  | Profile                  | Invalid token results in 401 and redirect to `/login`                  | passed |                                                                    |
| J3  | Profile                  | Invalid token results in 401 and redirect to `/login`                  | passed |                                                                    |
| J4  | Profile                  | Page refresh does not log user out                                     | passed |                                                                    |
| J5  | Profile                  | Profile is accessible in a new browser tab                             | passed |                                                                    |
| J6  | Profile                  | Logout clears localStorage and switches UI to guest                    | passed |                                                                    |
| J7  | Profile                  | Accessing `/profile` after logout redirects to `/login`                | passed |                                                                    |
| J8  | Profile                  | Delete account removes user and clears localStorage                    | passed |                                                                    |
| J9  | Profile                  | Deleted account cannot access `/profile`                               | passed |                                                                    |
| J10 | Profile                  | Server errors (e.g. 500) are handled correctly                         | passed |                                                                    |
| K1  | Errors                   | Invalid topic slug opens not-found page                                | passed |                                                                    |
| K2  | Errors                   | Invalid article slug opens not-found page                              | passed |                                                                    |
| K3  | Errors                   | Not-found page contains link/button to Home                            | passed |                                                                    |
| K4  | Errors                   | Error page is displayed and retry option works (if implemented)        | passed |                                                                    |
| L1  | API                      | All API responses are returned in JSON format                          | passed |                                                                    |
| L2  | API                      | API responses contain `success: true/false` field                      | passed |                                                                    |
| L3  | API                      | HTTP status codes match API specification                              | passed |                                                                    |
| L4  | API                      | Invalid JSON request body returns 400 error                            | passed |                                                                    |
| L5  | API                      | Protected endpoints without Authorization return 401                   | passed |                                                                    |
| L6  | API                      | Invalid authorization token returns 401                                | passed |                                                                    |
