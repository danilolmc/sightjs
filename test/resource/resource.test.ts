import { resource } from '@/lib/core/resource';
import { signal } from '@/lib/core/signal';
import { screen, waitFor } from '@testing-library/dom';
import { describe, expect, it, vi } from 'vitest';
import { html } from '@/lib/dom/html.ts';
import { Component } from '@/lib/dom/component/component.ts';
import { render } from '@/lib/dom/render.ts';

describe('Resource', () => {
  it('should react to signal change', async () => {
    const productId = signal(0);

    const product = resource({
      param: productId,
      loader: ({ param }): Promise<{ id: number }> => {
        const id = param();

        return new Promise((resolve) => {
          resolve({
            id,
          });
        });
      },
    });

    productId.set(1);

    await waitFor(() => {
      const productValue = product.value();
      expect(productValue.id).toBe(1);
    });
  });

  it('should handle error', async () => {
    const productId = signal(0);

    const product = resource({
      param: productId,
      loader: ({ param }): Promise<{ id: number }> => {
        const id = param();

        return new Promise((_, reject) => {
          reject(`Error: ${id}`);
        });
      },
    });

    productId.set(1);

    await waitFor(() => {
      const productValue = product.error();
      expect(productValue).toBe('Error: 1');
    });
  });

  it('should refresh request', () => {
    const fn = vi.fn();

    function loader({ param }) {
      return new Promise((resolve) => {
        fn();
        resolve(param());
      });
    }

    const product = resource({
      param: signal(0),
      loader,
    });

    product.refresh();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should render resource result in component template', async () => {
    const App = Component('app-resource', () => {
      const product = resource({
        param: signal<number>(0),
        loader: ({ param }): Promise<{ id: number }> => {
          return new Promise((resolve) => {
            resolve({ id: param() });
          });
        },
      });

      return () => html`
        <div data-testid="app-resource">${product.value().id}</div>
      `;
    });

    render(document.body, App);

    const appComponent = await screen.findByTestId('app-resource');

    expect(appComponent).toBeInTheDocument();
    expect(appComponent).toHaveTextContent('0');
  });

  it('template should update when resource changes', async () => {
    const productID = signal(0);
    const App = Component('app-resource-react', () => {
      const product = resource({
        param: productID,
        loader: ({ param }): Promise<{ id: number }> => {
          return new Promise((resolve) => {
            resolve({ id: param() });
          });
        },
      });

      return () =>
        html` <div data-testid="app-resource">${product.value().id}</div>`;
    });

    render(document.body, App);

    const appComponent = await screen.findByTestId('app-resource');

    expect(appComponent).toBeInTheDocument();
    expect(appComponent).toHaveTextContent('0');

    productID.set(1);

    await waitFor(async () => {
      const appComponentChanged = await screen.findByTestId('app-resource');

      expect(appComponentChanged).toBeInTheDocument();
      expect(appComponentChanged).toHaveTextContent('1');
    });
  });
});
