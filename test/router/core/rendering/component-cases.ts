import { Component, html } from '@/lib/dom';

export const componentRenderingCases = {
  home: Component(
    'app-home-test-a',
    () => () => html` <div data-testid="home-content">Home</div>`,
  ),
  about: Component(
    'app-home-about-test-b',
    () => () => html` <div data-testid="about-content">Home - About</div>`,
  ),
  post: Component(
    'app-about-param',
    () => () => html` <div data-testid="post-content">Post</div>`,
  ),
  postAuthor: Component(
    'app-author-nested-param',
    () => () => html` <div data-testid="author-content">Post - Author</div>`,
  ),
  notFound: Component(
    'app-render-notfound',
    () => () => html` <div data-testid="notFound-content">Not Found</div>`,
  ),
  parentOutlet: Component(
    'app-parent-outlet',
    () => () =>
      html` <div data-testid="parent-outlet-content">
        Parent
        <n-outlet />
      </div>`,
  ),
  childOutlet: Component(
    'app-child-outlet',
    () => () => html` <div data-testid="child-outlet-content">Child</div>`,
  ),
};