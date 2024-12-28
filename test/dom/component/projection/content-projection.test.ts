import { html } from '@/lib/dom/html.ts';
import { render } from '@/lib/dom/render.ts';
import { screen, within } from '@testing-library/dom';
import { Component } from '@/lib/dom/component/component.ts';
import { describe, expect, it } from 'vitest';

describe('Component content projection', () => {
  describe('default n-content block projection', () => {
    it('should project elements without slot property value inside unnamed n-content block', async () => {
      Component('p-message', () => {
        return () => html`
          <article data-testid="p-content">
            <n-content />
          </article>
        `;
      });

      const containerApp = Component('container-app', () => {
        return () => html` <p-message><p>Hey there</p></p-message>`;
      });

      render(document.body, containerApp);

      const message = await screen.findByTestId('p-content');
      const pWithin = await within(message).findByRole('paragraph');
      expect(pWithin).toHaveTextContent('Hey there');
    });

    it('should project text nodes inside unnamed n-content block', async () => {
      Component('p-text-node', () => {
        return () => html`
          <article data-testid="p-content">
            <n-content />
          </article>
        `;
      });

      const containerApp = Component('text-container-app', () => {
        return () => html` <p-text-node>Hey there</p-text-node>`;
      });

      render(document.body, containerApp);

      const message = await screen.findByTestId('p-content');
      expect(message).toHaveTextContent('Hey there');
    });
  });

  describe('named n-content block projection', () => {
    it('should project elements with slot property value inside named n-content block', async () => {
      Component('p-message-named', () => {
        return () => html`
          <article data-testid="p-content">
            <n-content name="a" />
          </article>
        `;
      });

      const containerApp = Component('container-app-named', () => {
        return () =>
          html` <p-message-named><p slot="a">Hey there</p></p-message-named>`;
      });

      render(document.body, containerApp);

      const message = await screen.findByTestId('p-content');
      const pWithin = await within(message).findByRole('paragraph');
      expect(pWithin).toHaveTextContent('Hey there');
    });

    it('should not project element if its respective n-content block is missing', async () => {
      Component('p-missing-message', () => {
        return () => html` <p data-testid="p-content"></p>`;
      });

      const containerApp = Component('container-missing-app', () => {
        return () =>
          html` <p-missing-message slot="msg">
            Hello named slot
          </p-missing-message>`;
      });

      render(document.body, containerApp);

      const message = await screen.findByTestId('p-content');

      expect(message).toHaveTextContent('');
    });
  });
});
