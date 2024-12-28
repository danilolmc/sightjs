import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/dom';
import { signal } from '@/lib/core/signal';
import { Component, html, render } from '@/lib/dom';

describe('LifeCycle', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should call onMount callback', async () => {
    const onMountCallback = vi.fn();

    const ButtonA = Component('l-button-a', ({ onMount }) => {
      onMount(onMountCallback);

      return () => html` <button data-testid="button-a">Click here</button>`;
    });

    render(container, ButtonA);

    const content = await screen.findByTestId('button-a');

    expect(content).toBeInTheDocument();
    expect(onMountCallback).toHaveBeenCalled();
  });

  it('should call onChange callback', async () => {
    const onChangeCallback = vi.fn();

    const counter = signal(0);

    const ButtonC = Component('l-button-c', ({ onChange }) => {
      onChange(onChangeCallback);

      return () =>
        html` <button data-testid="button-c">
            Click here onChange ${counter()}</button
          >>`;
    });

    render(container, ButtonC);

    counter.set(1);

    await waitFor(async () => {
      const content = await screen.findByTestId('button-c');
      expect(content).toHaveTextContent('Click here onChange 1');
      expect(onChangeCallback).toHaveBeenCalled();
    });
  });

  it('should call onDestroy callback', async () => {
    const onDestroyCallback = vi.fn();

    const ButtonB = Component('l-button-b', ({ onDestroy }) => {
      onDestroy(onDestroyCallback);

      return () =>
        html` <button data-testid="button-b">Click here onMount</button>>`;
    });

    render(container, ButtonB);

    const buttonHost = document.body.querySelector('l-button-b');
    buttonHost.remove();

    const content = screen.queryByTestId('button-b');

    expect(content).not.toBeInTheDocument();
    expect(onDestroyCallback).toHaveBeenCalled();
  });
});
