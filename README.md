# Premiere Night

A cross-platform React Native app that helps curators discover films and manage a watchlist for private screening events. Built with Expo.

## Tooling and prerequisites

- **Node.js** — LTS (e.g. 20+) recommended
- **npm** or **bun** — for installing dependencies
- **Expo** — use via `npx expo` (no global install required)
- **TMDb API key** — create one at [themoviedb.org](https://www.themoviedb.org/settings/api). Set it as `EXPO_PUBLIC_TMDB_API_KEY` in a `.env` or `.env.local` file in the project root (see [Expo env vars](https://docs.expo.dev/guides/environment-variables/)).

## Run the app

1. Install dependencies:
  ```bash
  bun install
  ```
   or with bun:
2. Ensure `EXPO_PUBLIC_TMDB_API_KEY` is set (e.g. in `.env` or `.env.local`).
3. Start the dev server:
  ```bash
  bun run start
  ```
4. Run on a platform:
  - **iOS**: Press `i` in the terminal (Expo Go) or run `npx expo run:ios` (development build).
  - **Android**: Press `a` in the terminal (Expo Go) or run `npx expo run:android` (development build).

Watchlist persistence uses the device file system (expo-file-system). It works in development builds; in Expo Go, behavior may depend on the environment.

**Deep link to Watchlist:** Open `premierenight://watchlist` or `premierenight:///watchlist` to go straight to the watchlist (e.g. from a shortcut, widget, or another app).

## Architecture and trade-offs

- **Stack**: Expo SDK 54, Expo Router (file-based routing), TanStack React Query (server state), Zustand (watchlist state + persistence).
- **Structure**: `apis/tmdb/` (client, API functions, raw→domain mapper, types), `types/` and `constants/` (shared), `store/` (watchlist + file-based persist), `components/`, `queries/`, `app/` (screens).
- **Trade-offs**: Watchlist is persisted with expo-file-system (file storage) instead of AsyncStorage to avoid native module issues in some Expo Go / dev setups. List endpoints (now playing, popular, search) share a single `fetchPaginated` helper to keep the API layer small.
- **Assumptions**: Search is by **title only** (no genre filter). Content language is English (TMDb `en-US`). The watchlist stores minimal summary data (poster, title, release date, etc.); the full synopsis is not stored on the watchlist screen.


## Screenshots

<table>
  <thead>
    <td>Home</td>
    <td>Search Movie</td>
    <td>Movie Detail</td>
    <td>Watchlist</td>
  </thead>
  <tbody>
    <tr>
        <td><img alt="image" src="https://github.com/user-attachments/assets/7a8196ac-7f2a-4a38-a588-a20f40eb46ee" /></td>
        <td><img alt="image" src="https://github.com/user-attachments/assets/0d117225-d544-4945-a9a9-e8059694c780" /></td>
        <td><img alt="image" src="https://github.com/user-attachments/assets/96f86d96-1510-43e6-a8c3-8ab735d84f63" /></td>
        <td><img alt="image" src="https://github.com/user-attachments/assets/c6330fac-0c69-4aab-9b3b-d3b10b4318f5" /></td>
    </tr>
  </tbody>
</table>



