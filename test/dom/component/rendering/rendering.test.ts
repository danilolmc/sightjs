import { html } from '@/lib/dom/html';
import { render } from '@/lib/dom/render';
import { screen } from '@testing-library/dom';
import { Component } from '@/lib/dom/component/component.ts';

describe('Component Crafting & Rendering', () => {
  it('should create a component with given name', async () => {
    const selector = 'button-a';

    const Button = Component(selector, () => {
      return () => html`Click here`;
    });

    render(document.body, Button);

    const button = await screen.findByText(/Click here/i);

    expect(button).toBeInTheDocument();
  });

  it(`should create component with "n" prefix followed by given tag name`, async () => {
    const selector = 'button-b';
    const expectedSelector = 'button-b';

    const Button = Component(selector, () => {
      return () => html`Click here`;
    });

    render(document.body, Button);

    const button = await screen.findByText(/Click here/i);

    expect(button.tagName.toLowerCase()).toBe(expectedSelector);
  });

  it('should render component with async definition', async () => {
    const selector = 'button-c';

    Component('app-random-child-2', async function ()  {
      return () => html`<span>Random</span> `;
    });


    const Button = Component(selector, async () => {
      return () => html`<p>Async Button</p>`;
    });

    render(document.body, Button);

    const button = await screen.findByText(/Async Button/i);

    expect(button).toBeInTheDocument();
  });
});
