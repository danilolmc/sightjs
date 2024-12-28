import { render } from '@/lib/dom/render.ts';
import { screen } from '@testing-library/dom';
import { html } from '@/lib/dom/html.ts';
import { Component } from '@/lib/dom/component/component.ts';
import { describe, expect, it } from 'vitest';

describe('Projection Block', () => {
  it('projection element should start with empty content', async () => {
    const nContentComponent = Component('content-cmp', () => {
      return () => html`
        <div data-testid="n-content">
          <n-content />
        </div>
      `;
    });

    render(document.body, nContentComponent);

    const content = await screen.findByTestId('n-content');

    expect(content).toHaveTextContent('');
  });
});
