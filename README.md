<header>
  <img style="margin: 0 auto; display: block" src="https://raw.githubusercontent.com/danilolmc/vistajs/refs/heads/beta/assets/vistajs-logo.svg" alt="VistaJS" width="100" />
  <h1 style="text-align: center">VistaJS</h1>
  <p style="text-align: center">VistaJS is a compact JavaScript framework for building web interfaces, offering built-in support for TypeScript and features like signals, computed values, effects, routing, testing and much more, all powered by Vite.</p>
</header>

```typescript
import { signal } from 'vistajs/core';
import { Component, html } from 'vistajs/dom';
import { boostrap } from 'vistajs/boot';

const counter = Component('app-counter', () => {
  const counter = signal(0);

  const increment = () => {
    counter.set(counter() + 1);
  };

  return () => html`<button onclick=${increment}>${counter()}</button>`;
});

const root = document.querySelector('#app') as Element;

boostrap(root, counter);
```

### Some of VistaJS features:

- **Signals**: Reactive signals for managing state.
- **Effects**: Sync changes and carry out side effects.
- **Computed Values**: Computed values derived from signals state.
- **Reactive data fetching**: Make resource fetching react to UI changes.
- **Routing**: Leverage client-side routing.
- **Lazy Loading**: Optimize your apps by leveraging lazy loading.
- **CSS Modules**: Support for CSS/CSS Modules and more.
- **Functional Components**: Leverage the simplicity.

Check [VistaJS docs](https://vistajs.gitbook.io/home/quickstart) to start your first project! 😉

# Contributing

Thank you for your interest in contributing to this project! We welcome all kinds of contributions, whether it’s improving documentation, fixing bugs, or adding new features. Please follow the steps below to ensure that your contribution is well-received.

## Table of Contents
1. [How to Contribute](#how-to-contribute)
    - [Reporting Issues](#reporting-issues)
    - [Contributing Code](#contributing-code)
2. [Development Workflow](#development-workflow)
3. [Code of Conduct](#code-of-conduct)
4. [General Guidelines](#general-guidelines)

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion, please [open an issue](https://github.com/danilolmc/vistajs/issues) with the following information:

1. **Description**: Clearly explain the problem or suggestion.
2. **Steps to Reproduce** (if applicable): Include the exact steps to reproduce the issue.
3. **Expected Behavior**: Describe what you expected to happen.
4. **Actual Behavior**: Describe what actually happened.
5. **Screenshots/Logs**: If applicable, include relevant screenshots or error logs to help us understand the issue better.

### Steps to Contribute Code

If you would like to contribute code, please follow these steps:

1. **Fork** the repository by clicking the "Fork" button at the top right of the page.
2. **Clone** the repository to your local machine:

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd vistajs
```
3. **Install dependencies** Before making any changes, make sure to install the project dependencies:

```bash
npm install
```

4. **Create a new branch** for your feature, doc or bug fix:

```bash
git checkout -b <branch-name>
```

5. **Make your changes**: Implement your feature or fix the bug. Please ensure your code follows the existing coding style.

6. **Add Tests**: If applicable, add tests to ensure that your changes don’t break existing functionality. New features should be accompanied by tests.

7. **Commit your changes**: After making the necessary changes, commit them with a clear and descriptive message.

```bash
git add .
git commit -m "feat: description of the feature"
```

8. **Push your changes** to your fork:

```bash
git push origin <feature-or-bugfix-branch>
```

10. **Open a Pull Request (PR)**: Go to the repository on GitHub and open a pull request to the main branch. Provide a clear description of your changes and why they should be merged.