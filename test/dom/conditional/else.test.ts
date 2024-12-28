import { html } from '@/lib/dom/html.ts';
import { render } from '@/lib/dom/render.ts';
import { screen } from '@testing-library/dom';
import { Component } from '@/lib/dom/component/component.ts';
import { describe, expect, it } from 'vitest';

describe('Conditional Else block', () => {
  it('should remove else block if its not declared as a n-if block next sibling', async () => {
    const elseBlock = Component('else-block', () => {
      return () => html`
        <div data-testid="elsecontainer">
          <n-else>
            Else block
          </n-else>
        </div>
      `;
    });

    render(document.body, elseBlock);

    const content = await screen.findByTestId('elsecontainer');

    expect(content).toHaveTextContent('')
  });
});
