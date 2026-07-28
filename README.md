# Sporty leagues [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[BuildStatusURL]: https://github.com/coderaiser/sporty-legues/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/sporty-leagues/workflows/Node%20CI/badge.svg
[CoverageURL]: https://coveralls.io/github/coderaiser/sporty-leagues?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/sporty-leagues/badge.svg?branch=master&service=github

<img width="1110" height="477" alt="image" src="https://github.com/user-attachments/assets/b0465af9-b6fc-4a1c-8884-716e24641ae6" />

## Install

```sh
git clone https://github.com/coderaiser/sporty-leagues
bun install
```

## Start

```
bun start:dev
```

For production version use:

```sh
bun start:prod
```

## Architectural and technical design decisions

**Bun** (with lock) was chosen over npm for faster installs and a lighter developer experience.

**Environment file** with `VITE_SPORTS_API_BASE_URL` makes the API base URL overridable without touching code, so the app can point to a different backend or mock server in any environment.

**TDD from the start** : every file has a test written before its implementation. This kept the architecture clean: small components, focused hooks, and no logic in the wrong layer.

**GitHub Actions** to check types, build, tests, coverage, fix lint and typos with AI.

**Deploy to GH Pages** on each created tag.

**MSW** provides a realistic network boundary in tests. Handlers return the same shape as the real API, so tests catch integration issues that unit mocks would miss.

**MUI** was chosen for production-ready accessible components out of the box: Modal, Select, TextField, Grid, the focus stayed on product logic rather than UI primitives.

**Filter pipeline** in `filter-leagues.ts` is designed to be extended, so adding fuzzy search, multi-select sport, or a country filter is one new function, no changes to existing code. Here is example:

```ts
const createSportFilter = (sport: string): LeagueFilter => {
    if (!sport)
        return () => true;
    
    return (league) => league.sport === sport;
};

const filteredLeagues = filterLeagues(leagues, [
    createSportFilter(sport),
]);
```

**Domain-driven structure**: code is grouped by what it does, not what type of file it is. `leagues/`, `badge/`, `filters/` each own their types, services, hooks, and components. New domains can be added without touching existing ones.

**React 19 with the React Compiler enabled** - it automatically memoizes components, values, and callbacks at build time. That means no manual `useMemo`, `useCallback`, or `memo` calls needed. The compiler analyzes your code and inserts the optimizations itself.
For this project specifically it means useFilters rerenders only when leagues, search, or sport actually change without us writing a single `useMemo`. Same for LeagueList — cards don't rerender when unrelated state changes, for free.

Designed with careful planning and implementation with Claude Code.

## License

MIT
