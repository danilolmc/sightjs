import { html } from '@/lib/dom/html';
import { render } from '@/lib/dom/render.ts';
import { screen } from '@testing-library/dom';
import { signal } from '@/lib/core/signal';
import { describe, expect, it, vi } from 'vitest';
import { MissingNSwitchValueAttributeError } from '@/lib/dom/errors/n-switch.errors.ts';
import { Component } from '@/lib/dom/component/component.ts';
import userEvent from '@testing-library/user-event';

describe('Switch block', () => {
  it('should render render correspondent string based is n-case element', async () => {
    const country = Component('app-country-content', () => {
      return () => html`
        <n-switch value="france" data-testid="switch-content">
          <n-case is="france" data-testid="ncase">France</n-case>
          <n-case default data-testid="ncase">Brazil</n-case>
        </n-switch>
      `;
    });

    render(document.body, country);

    const france = await screen.findByText('France');
    const brazil = screen.queryByText('Brazil');
    const switchElement = screen.queryByTestId('switch-content');
    const ncaseElement = screen.queryByTestId('ncase');

    expect(brazil).not.toBeInTheDocument();
    expect(ncaseElement).not.toBeInTheDocument();
    expect(france).toBeInTheDocument();
    expect(switchElement).toBeInTheDocument();
  });

  it('should rendering react to signal changes', async () => {
    const countryComponent = Component('country-signal', () => {
      const country = signal('');

      const handleCountry = (name: string) => {
        country.set(name);
      };

      return () =>
        html` <n-switch value=${country()}>
            <n-case is="germany"
              ><p data-testid="germany">Germany Country</p></n-case
            >
            <n-case default data-testid="brazil"><p>Brazil</p></n-case>
          </n-switch>

          <button
            data-testid="germany-button"
            onclick=${() => handleCountry('germany')}
          >
            Germany Button
          </button>`;
    });

    render(document.body, countryComponent);

    const germanyButton = await screen.findByTestId('germany-button');

    await userEvent.click(germanyButton);

    const germany = await screen.findByTestId('germany');
    const brazil = screen.queryByText('Brazil');
    const switchElement = screen.queryByTestId('switch-content');
    const ncaseElement = screen.queryByTestId('ncase');

    expect(germany).toBeInTheDocument();
    expect(brazil).not.toBeInTheDocument();
    expect(switchElement).not.toBeInTheDocument();
    expect(ncaseElement).not.toBeInTheDocument();
  });

  it('should render default n-case when switch value does not match any n-case', async () => {
    const defaulCountryComponent = Component('default-country', () => {
      return () =>
        html` <n-switch value="france">
          <n-case is="germany"><p>Germany</p></n-case>
          <n-case default><p data-testid="brazil">Brazil</p></n-case>
        </n-switch>`;
    });

    render(document.body, defaulCountryComponent);

    const defaultCountry = await screen.findByTestId('brazil');
    const germany = screen.queryByText('Germany');
    const switchElement = screen.queryByTestId('switch-content');
    const ncaseElement = screen.queryByTestId('ncase');

    expect(defaultCountry).toBeInTheDocument();
    expect(germany).not.toBeInTheDocument();
    expect(switchElement).not.toBeInTheDocument();
    expect(ncaseElement).not.toBeInTheDocument();
  });

  it('n-switch should not accept non n-case element children inside n-switch directly', async () => {
    const country = Component('app-country', () => {
      return () => html`
        <n-switch value="france" data-testid="switch">
          <p>Non n-case element</p>
          <n-case is="france">France</n-case>
          <n-case default>Brazil</n-case>
        </n-switch>
      `;
    });

    render(document.body, country);

    const switchComponent = await screen.findByTestId('switch');

    expect(switchComponent).toHaveTextContent('');
  });

  it('should remove n-switch block if value attribute is not defined', async () => {
    const spyConsoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const switchComponent = Component('app-missing-attr', () => {
      return () => html`
        <div data-testid="n-switch-content">
          <n-switch>
            <n-case is="france">France</n-case>
            <n-case default>Brazil</n-case>
          </n-switch>
        </div>
      `;
    });

    render(document.body, switchComponent);

    const content = await screen.findByTestId('n-switch-content');

    expect(content).toHaveTextContent('');
    expect(spyConsoleError).toHaveBeenCalledWith(
      expect.any(MissingNSwitchValueAttributeError),
    );
  });

  it(`should remove n-switch block if there's no matching n-case`, async () => {
    const removableSwitchComponent = Component('app-rm', () => {
      return () => html`
        <div data-testid="n-switch-no-content">
          <n-switch value="Italy">
            <n-case is="france">France</n-case>
          </n-switch>
        </div>
      `;
    });

    render(document.body, removableSwitchComponent);

    const content = await screen.findByTestId('n-switch-no-content');

    expect(content).toHaveTextContent('');
  });
});
