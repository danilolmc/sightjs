import { html } from '@/lib/dom/html.ts';
import { render } from '@/lib/dom/render.ts';
import { screen, waitFor } from '@testing-library/dom';
import { signal } from '@/lib/core/signal';
import { Component } from '@/lib/dom/component/component.ts';
import { describe, expect, it } from 'vitest';

describe('Conditional If block', () => {
  it('should render n-if block if condition attribute value is true', async () => {
    const ifBlock = Component('content-block', () => {
      const age = 18;
      const isAdult = age >= 18;

      return () => html`
        <n-if condition=${isAdult}> You can drive a car</n-if>
      `;
    });

    render(document.body, ifBlock);

    const block = await screen.findByText('You can drive a car');

    expect(block).toBeInTheDocument();
  });

  it(`should render n-else block when it's declared right after n-if block ending tag`, async () => {
    const ifElseBlock = Component('content-block-else', () => {
      const age = 12;
      const isAdult = age >= 18;

      return () => html`
        <n-if condition=${isAdult}> You can drive a car</n-if>
        <n-else> You can not drive a car</n-else>
      `;
    });

    render(document.body, ifElseBlock);

    const block = await screen.findByText('You can not drive a car');

    expect(block).toBeInTheDocument();
  });

  it(`should remove n-if block content if condition is not true neither false`, async () => {
    const ifElseBlock = Component('if-invalid-block', () => {
      return () => html`
        <div data-testid="nif-block">
          <n-if condition=""> You can drive a car</n-if>
          <n-else> You can not drive a car</n-else>
        </div>
      `;
    });

    render(document.body, ifElseBlock);

    const block = await screen.findByTestId('nif-block');

    expect(block).toHaveTextContent('');
  });

  it('should react to reactive condition changing', async () => {
    const isAdultAge = signal(false);

    const changeableContent = Component('change-block', () => {
      return () => html`
        <div data-testid="message">
          <n-if condition="${isAdultAge()}"> You can drive a car</n-if>
          <n-else> You can not drive a car</n-else>
        </div>
      `;
    });

    render(document.body, changeableContent);

    const canNotDriveMessage = await screen.findByTestId('message');

    expect(canNotDriveMessage).toHaveTextContent('You can not drive a car');

    isAdultAge.set(true);


    await new Promise(requestAnimationFrame)
    await waitFor(async () => {
      const canDriveMessage = await screen.findByTestId('message');
      expect(canDriveMessage).toHaveTextContent('You can drive a car');
    });
  });
});
