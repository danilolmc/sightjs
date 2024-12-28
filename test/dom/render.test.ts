import { screen } from '@testing-library/dom';
import { render } from '@/lib/dom/render';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';

describe('Render Function', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should render an html element inside a DOM container', () => {
    const button = document.createElement('button');
    button.innerHTML = 'Hello';

    render(container, button);

    const renderedButton = screen.getByText(/Hello/i);

    expect(renderedButton).toBeInTheDocument();
  });
});
