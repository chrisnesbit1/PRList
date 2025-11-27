# PRList

PRList is a lightweight single-page React application that fetches and displays pull requests across multiple GitHub repositories.  The goal of this project is to demonstrate my ability to learn React quickly, structure components cleanly, and design an interface that can easily swap its data source from GitHub’s public API to an internal C# Web API.  Nothing sensitive is persisted on the client, and the code is organised from day one for growth.

##Features (v1.0)
	•	Settings form – Collects a GitHub personal access token (held only in memory), the organisation name and a comma‑separated list of repositories.  Fields are fully controlled, validated on blur and submit, and only persist non‑sensitive values when the user explicitly saves them.
	•	Fetch on demand – Submitting a valid form triggers a call to GitHub’s REST API to list pull requests across the specified repositories.  There is no automatic fetch on page load because the token is never stored.
	•	Pull request table – Displays each pull request with the following normalised fields: username, repository, number, title, createdAt, updatedAt, comment count and status (open/draft).  Rows are sorted by updatedAt (with createdAt as a fallback), and stable keys ensure predictable rendering.
	•	Encapsulated data layer – All GitHub calls live in an api/githubClient.ts module behind a small service interface.  A custom usePullRequests hook handles asynchronous fetches, loading and error states, and maps raw API responses into the internal PullRequest model.
	•	Error handling – If a fetch fails, a dismissible banner appears at the top of the page and the table shows no rows.  The token is never exposed or logged.

#Architecture

##Feature‑first structure

Components related to pull requests live in src/features/pullRequests/ (e.g. SettingsForm, PullRequestTable, usePullRequests, and type definitions).  Shared UI building blocks, such as a generic Table and ErrorBanner, reside in src/components/common/.  API clients live in src/api/, isolating side effects from the UI layer.  This organisation anticipates future features without bloating the root of the project.

##Stable service interface

The UI depends on a PRService interface that exposes methods such as listPullRequests() and saveToken().  Today, the implementation wraps GitHub’s REST API and stores the token in memory.  In v1.1 a C# Web API will implement the same interface, securely storing the token and proxying requests.  Because the domain model and interface are fixed, the UI does not change when the backend does.

##Security first

The GitHub token is a sensitive secret.  In this version it is never persisted to disk or localStorage; it exists only in component state while the page is open.  When a C# backend is introduced, it will encrypt and store the token server‑side, returning only a validity indicator to the front‑end.

#Running the project
	1.	Clone this repository.
	2.	Install dependencies with npm install.
	3.	Start the development server with npm start.
	4.	Open the app in your browser and enter a personal access token (with at least repo scope), the organisation name and a comma‑separated list of repositories.  Click Save to persist the non‑secret fields, then Submit to fetch pull requests.  The token remains in memory and is cleared on refresh.

#Roadmap

##v1.0 (Complete)
	•	Settings form with controlled inputs and validation.
	•	In‑memory token storage only.
	•	Explicit fetch triggered by form submission.
	•	Display table of pull requests with normalised fields.
	•	Sort by updatedAt, fallback to createdAt.
	•	Dismissible error banner on fetch failure.
	•	Feature‑first folder structure, API abstraction layer and custom hook.

##v1.1 – Back‑end integration
	•	Replace direct GitHub calls with a C# Web API that securely stores and encrypts the token.
	•	Provide endpoints to list pull requests and return token validity without exposing the token.
	•	Autoload pull requests on page load when a valid stored token exists.
	•	Maintain the existing PullRequest model and PRService interface to avoid UI changes.

##Future enhancements
	•	Advanced filtering (by status, author) and grouping (by release, priority).
	•	Drag‑and‑drop reordering of pull requests.
	•	Display additional metadata (e.g. release identifiers or internal priorities).
	•	Real‑time updates via WebSockets/SignalR.
	•	Support for multiple SCM providers (GitLab, Bitbucket) or internal repositories.
	•	Automated tests for components and hooks.
