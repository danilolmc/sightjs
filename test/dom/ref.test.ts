import { html } from '@/lib/dom/html.ts';
import { render } from '@/lib/dom/render.ts';
import { screen, waitFor } from '@testing-library/dom';
import { signal } from '@/lib/core/signal';
import { clearRefs, ref } from '@/lib/dom/ref/ref.ts';
import { Component } from '@/lib/dom/component/component.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Ref', () => {
  beforeEach(() => {
    clearRefs();
  });

  it('should accept an initial value', () => {
    const button = ref(0, 'buttonRef');
    expect(button.current).toBe(0);
  });

  it('should set the value correctly', () => {
    const buttonRef = ref(0, 'buttonRef');

    buttonRef.current = 1;

    expect(buttonRef.current).toBe(1);
  });

  it('should set the value correctly when its an HTMlElement', async () => {
    const button = document.createElement('button');
    const buttonRef = ref<HTMLButtonElement>(null, 'boundedRef');

    buttonRef.current = button;

    expect(buttonRef.current).toBe(button);
  });

  it('reference to bounded ref variable name should return ref name', () => {
    const buttonRef = ref(0, 'buttonRef');
    const name = buttonRef();
    expect(name).toBe('buttonRef');
  });

  it('should be possible to bind a ref to an html element', async () => {
    const refComponent = Component('ref-component', () => {
      const buttonRef = ref(0, 'buttonRef');

      return () => html` <button ref=${buttonRef()}>Click here</button>`;
    });

    render(document.body, refComponent);

    const button = await screen.findByText(/Click here/i);

    expect(button.getAttribute('ref')).toBe('buttonRef');
  });

  it('should persist ref value between renders', async () => {
    Component('child-component-ref', () => {
      const buttonRef = ref(1, 'myRef');

      const changeRef = () => {
        buttonRef.current = buttonRef.current + 1;
      };
      return () => html`
        <button onclick="${changeRef}" data-testid="childBtn">
          ${buttonRef.current}
        </button>
      `;
    });
    const refComponent = Component('ref-component-2', () => {
      const count = signal(0);

      return () => html`
        <child-component-ref />
        <div>
          <button
            onclick="${() => count.set(count() + 1)}"
            data-testid="parentBtn"
          >
            ${count()}
          </button>
        </div>
      `;
    });

    render(document.body, refComponent);

    const parentButton = await screen.findByTestId('parentBtn');
    const childButton = await screen.findByTestId('childBtn');

    expect(childButton).toHaveTextContent('1');
    expect(parentButton).toHaveTextContent('0');

    childButton.click();
    parentButton.click();

    await waitFor(async () => {
      const newParentButton = await screen.findByTestId('parentBtn');
      const newChildButton = await screen.findByTestId('childBtn');

      expect(newParentButton).toHaveTextContent('1');
      expect(newChildButton).toHaveTextContent('2');
    });
  });

  it('should be possible to change dom elements', async () => {
    const buttonRef = ref<HTMLButtonElement>(null, 'changeableElement');

    const refComponent = Component('ref-component-attr', () => {
      return () =>
        html` <button ref=${buttonRef()} data-testid="targetBtn">
          Click here
        </button>`;
    });

    render(document.body, refComponent);

    const button = await screen.findByTestId('targetBtn');

    expect(button.getAttribute('ref')).toBe('changeableElement');

    buttonRef.current.setAttribute('test', 'test');

    const newButton = await screen.findByTestId('targetBtn');

    expect(newButton).toHaveAttribute('test');
  });
});
