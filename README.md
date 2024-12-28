<header>
  <img style="margin: 0 auto; display: block" src="./assets/viewjs-logo.svg" alt="ViewJS" width="100" />
  <h1 style="text-align: center">ViewJS</h1>
  <p style="text-align: center">ViewJS is a JavaScript mini-framework for building web interfaces, with support for TypeScript and features like signals, computed values, effects, routing, testing and much more, powered by Vite.</p>
</header>

```typescript
import { signal } from 'viewjs/core';
import { Component, html } from 'viewjs/dom';
import { boostrap } from 'viewjs/boot';

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

### Some ViewJS features
- **Signals**: Reactive signals for managing state.
- **Effects**: Sync changes and carry out side effects.
- **Computed Values**: Computed values derived from signals state.
- **Reactive data fetching**: Make resource fetching react to UI changes.
- **Routing**: Leverage client-side routing.
- **Lazy Loading**: Optimize your apps by leveraging lazy loading.
- **CSS Modules**: Support for CSS/CSS Modules and more.
- **Functional Components**: Leverage the simplicity.

Check [ViewJS docs](https://viewjs.gitbook.io/home/quickstart) to start your first project! 😉