# PRList

**PRList** is a lightweight React single-page application that fetches and displays pull requests across multiple GitHub repositories.  
It’s intentionally small, but built with the same structure and boundaries you’d expect in a real production UI.

The purpose of this project is to demonstrate:

- Ability to learn React quickly and write clean, well-organized components  
- Good separation between UI, data fetching, and domain models  
- A stable service interface that can easily swap its backend from GitHub → a future C# Web API  
- Awareness of client-side security concerns (GitHub token stored in memory only)  
- Practical, maintainable architecture without over-engineering

---

## Features (v1.0)

**1. Settings Form**

- GitHub Personal Access Token (never persisted — memory only)  
- GitHub organization  
- Comma-separated list of repositories  
- Controlled inputs with validation (onBlur + onSubmit)  
- Saves only non-sensitive fields to localStorage when user clicks **Save**

**2. Pull Request Table**

- Normalized PR model:
  - `id`
  - `repo`
  - `number`
  - `title`
  - `username`
  - `updatedAt`
  - `createdAt`
  - `commentCount`
  - `status`
- Sorts by **updatedAt** descending (fallback: createdAt)
- Handles errors gracefully with a dismissible error banner
- Renders an empty table if fetch fails (no crash states)

**3. Architecture**

- Feature-first folder layout (`/features/pullRequests`)
- Dedicated **PRService** interface separating UI from data source
- GitHub implementation of that interface (v1.0)
- Ready for a C# implementation (v1.1)
- `usePullRequests` custom hook for async logic + loading/error state
- Clean, declarative React components (no prop-drilling clutter)

---

## Why This Project Exists

This is a focused demonstration of how I approach front-end architecture:

- Define clear boundaries  
- Keep side effects isolated  
- Normalize external data  
- Make the UI backend-agnostic  
- Favor simplicity where it matters  
- Build something small that *feels* scalable

Although this project could have been hacked together quickly, it’s intentionally structured to show that I don’t take shortcuts with component design, data flow, or security.

---

## Security Notes

- GitHub token is **not** stored in localStorage or sessionStorage  
- Token remains in memory and is lost on page reload  
- This avoids exposing credentials to XSS or browser-persistent storage  
- v1.1 introduces a secure backend that stores and encrypts the token server-side

---

## Future-Ready Design

The UI depends on a stable **PRService** interface.  
That means:

- Today: GitHub REST API directly  
- Tomorrow: A C# Web API acting as a secure proxy  
- UI code stays the same — only the service implementation changes

The PR model is also normalized so the UI never depends on GitHub’s raw response shape.  
This keeps the React layer stable even if the backend evolves.

---

## Roadmap (High-Level)

### v1.1
- C# backend to securely accept, encrypt, and store GitHub tokens  
- Backend becomes the GitHub proxy  
- Frontend switches to a `CSharpProxyClient` implementation  
- Autoload PRs on page load (since backend stores token)  
- Improved sorting, filtering, and error handling

### Future Enhancements
- Group PRs by release, repo, or priority  
- Drag-and-drop PR prioritization  
- PR metadata augmentation via backend  
- Server-side pagination & filtering  
- Dark mode and minor styling upgrades

---

## Running Locally
```
npm install
npm run dev
```
Then open:
http://localhost:5173

You will need:

- A Personal Access Token with `repo` or `public_repo` scope  
- An organization name  
- One or more repo names (comma-separated)

---

## Final Notes

This project reflects how I approach real-world software — practical, clear, and future-ready.  
It’s small by design, but the architectural decisions are deliberate, not accidental.
