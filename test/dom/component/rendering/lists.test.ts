import { signal } from '@/lib/core';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Component, html, render } from '@/lib/dom';

describe('Component Crafting & Rendering', () => {
  it('should render a list', async () => {
    const List = Component('app-list', () => {
      const elements = [1, 2, 3, 4];
      return () =>
        html`${elements.map(
          (item) => `<li data-testid="list-element">${item}</li>`,
        )}`;
    });

    render(document.body, List);

    const listItems = await screen.findAllByRole('listitem');

    expect(listItems).toHaveLength(4);
  });

  it('should react to reactive list', async () => {
    const List = Component('app-list-reactive', () => {
      const elements = signal([1, 2, 3, 4]);

      const addElement = () => {
        const newElements = [...elements(), 5];
        elements.set(newElements);
      };

      return () => html`
        ${elements().map(
          (item) => `<li data-testid="list-element">${item}</li>`,
        )}
        <button data-testid="add-element" onclick=${addElement}></button>
      `;
    });

    render(document.body, List);

    const button = await screen.findByRole('button');

    await userEvent.click(button);

    const listItems = await screen.findAllByRole('listitem');

    expect(listItems).toHaveLength(5);
  });
});
