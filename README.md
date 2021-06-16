This project is to demostrate the work of React+Redux in typescript, with jest 100% test coverage.

The application contains 3 pages:
- home page that asks for a github username and a query button;
- user github repo listing page that you can select a github repo;
- directory listing on the first level on the selected github repo, and also render the README.md in Markdown

## Steps
### bootstrap with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
```
 $ npx create-react-app react-demo-app --template redux-typescript
```

the template will come with redux [slice pattern](https://redux.js.org/faq/code-structure#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go)

### eject
```
 $ npm run eject
```
or
```
 $ yarn eject
```

### refactor from the default template (personal preferences, may skip this)
- `features`: all redux related code
- `components`: usable react components
- `pages`: basically react components, but as a page

for convenience and escape from the relative path hell (e.g. "../../../src/components/Home/index), modify 3 files for adding alias:
- `tsconfig.json`
- `config/webpack.config.js`
- `package.json`: `jest.moduleNameMapper`

my alias:
- `@base`: the root of the `src`
- `@pages`: `src/pages`
- `@components`: `src/components`
- `@features`: `src/features`

### configure router with redux
please refer to `src/app/store.ts` for details

### pick a simple UI framework
applied bootstrap. not a fan but it's simple without anything to configure, and come with bootstrap icons

### start the work on redux thunk to connect to github api
please refer to `src/features/github` for details

### work on the UI as well
please refer to `src/components` and `src/pages` for details

### polishing......
think, re-design and refactor

### dont forget the unit test
the template come with `jest` and `@testing-library/react` which is good and handy.

```
 PASS  src/App.test.tsx
 PASS  src/components/DataList/index.spec.tsx
 PASS  src/pages/Files/index.spec.tsx
 PASS  src/pages/Home/index.spec.tsx
 PASS  src/components/ErrorBar/index.spec.tsx
 PASS  src/pages/Repos/index.spec.tsx
 PASS  src/components/Nav/index.spec.tsx
 PASS  src/app/hooks.spec.ts
 PASS  src/features/github/slice.spec.ts
 PASS  src/index.spec.tsx
 PASS  src/features/error/slice.spec.ts
 PASS  src/features/github/api.spec.ts
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |   78.45 |    66.32 |   76.81 |   75.78 |
 src                     |   15.22 |        0 |      20 |   15.22 |
  App.tsx                |     100 |      100 |     100 |     100 |
  index.tsx              |     100 |      100 |     100 |     100 |
  serviceWorker.ts       |       0 |        0 |       0 |       0 | 13-143
 src/app                 |     100 |      100 |     100 |     100 |
  hooks.ts               |     100 |      100 |     100 |     100 |
  store.ts               |     100 |      100 |     100 |     100 |
 src/components/DataList |     100 |      100 |     100 |     100 |
  index.tsx              |     100 |      100 |     100 |     100 |
 src/components/ErrorBar |     100 |      100 |     100 |     100 |
  index.tsx              |     100 |      100 |     100 |     100 |
 src/components/Nav      |     100 |      100 |     100 |     100 |
  index.tsx              |     100 |      100 |     100 |     100 |
 src/features/error      |     100 |      100 |     100 |     100 |
  slice.ts               |     100 |      100 |     100 |     100 |
 src/features/github     |     100 |      100 |     100 |     100 |
  api.ts                 |     100 |      100 |     100 |     100 |
  slice.ts               |     100 |      100 |     100 |     100 |
 src/pages/Files         |     100 |      100 |     100 |     100 |
  index.tsx              |     100 |      100 |     100 |     100 |
 src/pages/Home          |     100 |      100 |     100 |     100 |
  index.tsx              |     100 |      100 |     100 |     100 |
 src/pages/Repos         |     100 |      100 |     100 |     100 |
  index.tsx              |     100 |      100 |     100 |     100 |
-------------------------|---------|----------|---------|---------|-------------------

Test Suites: 12 passed, 12 total
Tests:       53 passed, 53 total
Snapshots:   0 total
Time:        3.919 s
Ran all test suites.
```

The project gets 100% test coverage except serviceWorker.ts - it comes with CRA, not our code so leave it alone.

### deploy the project on github page
since the application is a single page application with react-router to handle different URL. although the URL in browser navigation gets changed, it still remains on the same page.

without server-side support, the application will get a 404 fail if user do a browser refresh on some path.

to solve this, either use `HashRouter` with `HashHistory` in [react-router](https://reactrouter.com/web/api/HashRouter), or [do a trick with 404 handling](https://github.com/rafgraph/spa-github-pages).

this project uses the latter one.

### available scripts
```
 $ npm start
 $ npm run build
 $ npm run test -- --coverage
```

### roadmap
- e2e test, with [Cypress](https://www.cypress.io/)
- i18n (e.g. i18next), to handle translations, date/number formats, or even ltr/rtl layout
