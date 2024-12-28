import { signal } from '@/lib/core/signal';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Component, html, render } from '@/lib/dom';

type Prop = {
  value: string;
};

describe('Component Signals Interpolation', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should update template when bounded signal gets updated', async () => {
    const counterComponent = Component<Prop>(`app-counter`, () => {
      const counter = signal(0);

      const handleCounter = () => {
        counter.set(counter() + 1);
      };
      return () => html`
        <p>${counter()}</p>
        <button onclick=${handleCounter}>Increment</button>
      `;
    });

    render(container, counterComponent);

    const button = await screen.findByRole('button', {
      name: /Increment/i,
    });

    await userEvent.click(button);

    await waitFor(() => {
      const updatedText = screen.getByText('1');
      expect(updatedText).toBeInTheDocument();
    });
  });

  it('should update template when html element attribute bounded signal gets updated', async () => {
    const message = signal('Hello');

    Component<Prop>(`app-prop`, ({ value }) => {
      return () => html`<p>${value}</p> `;
    });

    const parent = Component('app-prop-parent', () => {
      return () => html` <app-prop value="${message()}" />`;
    });

    render(container, parent);

    message.set('New Message');

    const element = await screen.findByText('New Message');

    expect(element).toBeInTheDocument();
  });
});
