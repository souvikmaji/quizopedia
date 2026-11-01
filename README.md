# Quizopedia

Simple quiz app created using react

## Run

Install the dependencies first by `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



## Development and validation

Use Node.js 22 or 24 (the `.nvmrc` selects 22). Install the committed dependency tree with `npm ci`.

```sh
npm start
npm run typecheck
npm run lint
CI=true npm test -- --watchAll=false --runInBand
CI=true npm run build
```

The app continues to use React 16. CRA 5 uses TypeScript 4.9 and ESLint 8; the TypeScript ESLint parser and plugin are pinned to compatible versions. No legacy OpenSSL option is required.

CI checks both supported Node.js versions. Regression tests mock the quiz API and cover answering ten questions, scoring, disabled answer buttons, restart, API response mapping, and network-error propagation. These tests do not depend on the availability of Open Trivia DB.
