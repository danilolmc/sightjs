import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/dom';
import { Component, html, render } from '@/lib/dom';
import { boostrap } from '@/lib/boot';
import { Routes } from '@/lib/router';

describe('Boot', () => {
  it('should bootstrap an app', async () => {
    vi.spyOn({ render }, 'render');

    const app = document.createElement('div');

    app.setAttribute('data-testid', 'app');

    boostrap(document.body, app);

    const appElement = await screen.findByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  it('should handle route provider', async () => {
    const homeComponent = Component('app-home', () => {
      return () => html` <div data-testid="home">Home</div>`;
    });

    const routes: Routes = [
      {
        path: '',
        component: () => homeComponent,
      },
    ];

    const root = document.createElement('div');

    boostrap(document.body, root, {
      routes,
    });

    await waitFor(async () => {

    const appElement = await screen.findByTestId('home');
    expect(appElement).toBeInTheDocument();

    })
  });
});
