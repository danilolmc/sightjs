import { Component, html, render } from '@/lib/dom';
import { screen } from '@testing-library/dom';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Component Interpolation', () => {
  beforeAll(() => {
    Component<{ value: any }>(`button-c`, (props) => {
      return () => html`${props?.value}`;
    });
  })


  it.each([0, 'hello', true, 2.5, undefined, null])(
    'should interpolate primitive value: %s in component template',
    async (param) => {

      const buttonHost = document.createElement('div');
      buttonHost.innerHTML = `<button-c value=${param} />`;

      render(document.body, buttonHost);

      const button = await screen.findByText(new RegExp(`${param}`));
      expect(button).toBeInTheDocument();
    },
  );
});
