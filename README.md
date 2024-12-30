<header>
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 7187 7188" fill="none">
     <style>
      svg {
        display: block;
        margin: auto;
      }
      @media (prefers-color-scheme: dark) {
        .border { stroke: white; }
        .line { fill: white; }
      }
      @media (prefers-color-scheme: light) {
        .border { stroke: black; }
        .line { fill: black; }
      }
     </style>
     <rect class="border" x="80.0703" y="80.6113" width="7026.66" height="7026.66" rx="748" stroke-width="160"></rect>
     <path d="M3575.29 561.943L3708.12 3654.04L3575.29 6625.94L3478.68 3654.04L3575.29 561.943Z" fill="white" class="line"></path>
     <path class="line" d="M561.402 3612.05L3653.5 3479.22L6625.4 3612.05L3653.5 3708.67L561.402 3612.05Z" fill="white"></path>
    </svg>
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
