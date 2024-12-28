import { routeTesting } from '@/lib/router/testing/router.testing.ts';
import { screen } from '@testing-library/dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { CanActivateFn, HandlersFacade, router } from '@/lib/router';
import { Component, html } from '@/lib/dom';
import { waitForRouting } from '@/lib/utils';

const authGuard: CanActivateFn = () => false;

const authAdminGuard: CanActivateFn = () => true;

const componentCases = {
  home: Component('app-home-page', () => {
    return () => html` <div data-testid="home-content">Home Page</div>`;
  }),
  about: Component('app-about-page', () => {
    return () => html` <div data-testid="about-content">About Page</div>`;
  }),
  admin: Component('app-admin-page', () => {
    return () => html` <div data-testid="admin-content">Admin Page</div>`;
  }),
  settings: Component('app-settings-page', () => {
    return () => html` <div data-testid="settings-content">Settings Page</div>`;
  }),
  users: Component('app-users-page', () => {
    return () => html` <div data-testid="users-content">Users Page</div>`;
  }),
};

describe('Router Guard', () => {
  const HandlersFacadeMock: HandlersFacade = {
    notFoundHandler: vi.fn(() => ({
      handle: vi.fn(),
    })),
    documentTitleHandler: vi.fn(() => ({
      handle: vi.fn(),
    })),
  };

  beforeAll(() => {
    routeTesting(
      [
        {
          path: 'home',
          component: () => componentCases.home,
          children: [
            {
              path: 'about',
              canActivate: [authGuard],
              component: () => componentCases.about,
            },
          ],
        },
        {
          path: 'admin',
          canActivate: [authAdminGuard],
          component: () => componentCases.admin,
        },
        {
          path: 'settings',
          component: () => componentCases.settings,
          redirectTo: 'users',
        },
        {
          path: 'users',
          component: () => componentCases.users,
        },
      ],
      {
        handlersFacade: HandlersFacadeMock,
      },
    );
  });

  it('should not render about page as its auth guard function returns false', async () => {
    const route = router();

    route.navigateByUrl('/home/about');

    waitForRouting(() => {
      const aboutPage = screen.queryByTestId('about-content');
      expect(aboutPage).not.toBeInTheDocument();
      expect(window.location.pathname).toBe('/home');
    });
  });

  it('should render admin page as its auth guard function returns true', async () => {
    const route = router();

    route.navigateByUrl('/admin');

    const adminPage = await screen.findByTestId('admin-content');
    expect(adminPage).toBeInTheDocument();

    expect(window.location.pathname).toBe('/admin');
  });

  it('should redirect to users page when settings page is visited', async () => {
    const route = router();

    route.navigateByUrl('/settings');

    const usersPage = await screen.findByTestId('users-content');
    expect(usersPage).toBeInTheDocument();

    expect(window.location.pathname).toBe('/users');
  });
});
