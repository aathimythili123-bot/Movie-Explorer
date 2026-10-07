# AI-Assisted Activity Log

## 1. Generate components
Prompt: "Generate React components for a movie explorer: search bar, genre filter chips, movie card, grid, details page, loader and error message."
Result: first draft had one large `Home` component with fetch logic, filtering, and markup together.

## 2. Refactor for reusability
Prompt: "Refactor this component into small reusable parts and extract repeated logic into hooks."
Changes: extracted `SearchBar`, `CategoryFilter`, `MovieCard`, `MovieGrid`, `Rating`, `Loader`, `ErrorMessage`; moved loading/error/data handling into `useAsync` and typing delay into `useDebounce`. `Rating` is reused on cards and the details page; `Loader` and `ErrorMessage` on both pages.

## 3. State management troubleshooting
| Problem | Cause (found with AI help) | Fix |
|---|---|---|
| Old search results appeared after typing quickly | Slow earlier requests resolved after newer ones (race condition) | `ignore` flag in `useAsync` cleanup |
| API called on every keystroke | Query state changed per character | `useDebounce` (400 ms) |
| Search and filter reset on refresh or back | State held only in `useState` | Moved to URL search params |
| Blank page on GitHub Pages refresh | BrowserRouter needs server rewrites | Switched to `HashRouter` |

## Reflection
AI drafts were reviewed and edited: the race-condition fix and URL-state design were verified by testing quick typing and page refreshes.
