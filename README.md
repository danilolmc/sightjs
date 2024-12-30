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
