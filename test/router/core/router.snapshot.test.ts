import { screen, waitFor } from '@testing-library/dom';
import { router, RouterEvents, routeTesting, routingEventListener } from '@/lib/router';
import { beforeAll, describe, expect, it } from 'vitest';
import { Component, html } from '@/lib/dom';

const componentsCases = {
  home: Component('app-home-test-a', () => () => html` <div>Home</div>`),
  about: Component(
    'app-home-about-test-b',
    () => () => html` <div data-testid="home-content">Home - About</div>`,
  ),
  aboutWithParams: Component('app-about-param', () => {
    const route = router();
    return () =>
      html` <div data-testid="about-content">
        Post ID - ${route.snapshot.params.id}
      </div>`;
  }),
  nestedWithParams: Component('app-author-nested-param', () => {
    const route = router();

    return () =>
      html` <div data-testid="about-content">
        Post ID - ${route.snapshot.root.post.id}, Author -
        ${route.snapshot.root.author.name}
      </div>`;
  }),
};

describe('Snapshot API', () => {
  beforeAll(() => {
    routeTesting([
      { path: '' },
      {
        path: 'about',
        component: () => componentsCases.about,
      },
      {
        path: 'post/:id',
        component: () => componentsCases.aboutWithParams,
        children: [
          {
            path: 'author/:name',
            component: () => componentsCases.nestedWithParams,
          },
        ],
      },
    ]);
  });

  it('should render route param and its respective component', async () => {
    const route = router();
    route.navigateByUrl('/post/1');

    const about = await screen.findByText('Post ID - 1');

    expect(about).toBeInTheDocument();
  });

  it('should render all route params from nested routes', async () => {
    const route = router();

    route.navigateByUrl('/post/1/author/John Doe');

    await waitFor(async () => {
      const postWithAuthorName = await screen.findByText(
        'Post ID - 1, Author - John Doe',
      );

      expect(postWithAuthorName).toBeInTheDocument();
    });
  });

  it('should get current route param with change_end route event', async () => {
    const route = router();

    routingEventListener.on(RouterEvents.CHANGE_END, () => {
      const params = route.snapshot.params;
      expect(params.name).toBe('John Doe');
      expect(params.id).toBeUndefined();
    });

    route.navigateByUrl('post/1/author/John Doe');
  });

  it('should get all params in the route with change_end route event', async () => {
    const route = router();

    routingEventListener.on(RouterEvents.CHANGE_END, () => {
      const params = route.snapshot.root;

      expect(params.post.id).toBe('1');
      expect(params.author.name).toBe('John Doe');
    });

    route.navigateByUrl('post/1/author/John Doe');
  });

  it('should get query params from route with change_end route event', async () => {
    const route = router();

    routingEventListener.on(RouterEvents.CHANGE_END, () => {
      expect(route.snapshot.queryParams.name).toBe('John Doe');
    });

    route.navigateByUrl('/about', {
      queryParams: {
        name: 'John Doe',
      },
    });
  });
});
