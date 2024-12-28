import { Component, html } from '@/lib/dom';

export const about = Component(
  'app-lazy-about',
  () => () => html` <div data-testid="about-content">Home - About</div>`,
);

export default about;
