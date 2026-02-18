## SpaceX Explorer

A frontend application for exploring SpaceX launches built with Next.js (App Router) + TypeScript, focusing on UI/UX quality, strong typing, data-layer architecture, and performance considerations.

Production deployment (Vercel):
https://space-x-next-js.vercel.app

## 🚀 How to Run

1) Clone the repository
2) Create a .env file based on .env.example
3) Install dependencies:
```bash
npm install
```
4) Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


---

## Features

- **Launches list** — server-side pagination, filters (status, outcome, date range), sort, name search, infinite "Load More"
- **Launch detail** — SSR with React Query hydration, rocket and launchpad info fetched in parallel, Flickr gallery
- **Favorites** — bookmark any launch, persisted in localStorage, dedicated favorites page

---


## Project Structure

```
src/
  app/                        # Next.js routes and layouts
    components/               # Layout-level components (Header, Footer, MainLayout)
    launches/                 # /launches and /launches/[id] pages
    favorites/                # /favorites page
  features/
    launches/                 # All launches domain logic
      components/             # LaunchCard, LaunchesList, LaunchDetail, LaunchesFilters
      services/               # React Query hooks, query builders
      types/                  # Launch, Rocket, Launchpad, filter types
    favorites/                # Favorites domain
      components/             # FavoriteButton, FavoritesList
      services/               # useFavorites hook
  shared/
    ui/                       # Button, Input, Select, Skeleton, Spinner
  lib/
    api/                      # fetcher with retry/backoff, SpaceX API methods
```

# Architecture Overview

## Routing Strategy — App Router
The project uses Next.js App Router because:

- It represents the current recommended Next.js architecture.
- It enables flexible layout composition.
- It allows future migration to Server Components if needed.
- Convenient routing

Trade-off: App Router increases hydration complexity when mixing client/server components.

---

## SSR and Hydration

| Route | Strategy | Reason |
|---|---|---|
| `/launches` | Client-only | Filters and infinite query require client state; searchParams are read via `useSearchParams` |
| `/launches/[id]` | SSR + hydration | First paint shows real data; falls back to client fetch if SSR fails (network error, 5xx) |
| `/favorites` | Client-only (`ssr: false`) | localStorage is unavailable on the server; `dynamic` with `ssr: false` avoids hydration mismatch cleanly |

## Data Layer

State management and caching are implemented using:

- @tanstack/react-query (v5)
- Responsibilities:
- Request deduplication
- Cache management
- Background refetch
- Infinite queries
- Retry & Backoff Strategy

React Query’s built-in retry was intentionally disabled.

Instead, retry and exponential backoff logic (including handling of 429 and 5xx responses) are implemented inside a custom API client as requested.

## SpaceX API Usage

Data source: SpaceX REST API v4

Endpoints used:

- POST /launches/query — server-side pagination, filtering, sorting
- GET /launches/:id
- GET /rockets/:id
- GET /launchpads/:id

Pagination Strategy:
- True server-side pagination (limit + page)
- No client-side full dataset filtering
- Infinite query with "Load More" button

## React Query vs SWR

React Query was chosen instead of SWR because:

- Better suited for infinite scrolling / pagination.
- Handles mutations (favorites) more efficiently.
- Provides advanced caching, deduplication, and background updates.
- SWR could work for simple fetch/caching, but React Query gives full control over complex client-side interactions.

## Performance Considerations

Implemented:
- Server-side pagination
- React Query cache deduplication
- Memoized launch cards
- Skeleton loading states
- Controlled re-renders
- Manual retry/backoff handling

Not implemented:
List virtualization (react-window)

## UX & Accessibility

- Loading / Error / Empty states
- Retry action for failed requests
- Semantic HTML structure
- Accessible buttons and labels
- Keyboard navigation
- Focus-visible styles
- ARIA attributes where applicable
---

## Trade-offs

- CSR for the list instead of SSR — faster development and smoother UX for dynamic filtering.
- Infinite pagination instead of virtualization — sufficient for medium-sized datasets.
- LocalStorage for favorites — no cross-tab synchronization.
- Manual retry implementation instead of React Query default

## Possible Improvements

- List virtualization (tanstack-virtual)
- Charts (launches per year / success rate)
- Offline caching (Service Worker)
- Launch comparison view

## Known Limitations

- No virtualization for very large lists
- Favorites do not sync across tabs
- No offline support
