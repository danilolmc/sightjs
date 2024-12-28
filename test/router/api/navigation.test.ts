import { describe, expect, it, vi } from 'vitest';
import { HistoryAPI, RouteNavigationApi } from '@/lib/router';

describe('navigation', () => {
  const HistoryApiMock: HistoryAPI = {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    patchReplaceState: vi.fn(),
    patchPushState: vi.fn(),
  };

  const navigationApi = new RouteNavigationApi(HistoryApiMock);

  it('should call pushState', () => {
    navigationApi.navigateByUrl('/home');
    expect(HistoryApiMock.pushState).toHaveBeenCalled();
  });

  it('should call replaceState if replaceUrl is true', () => {
    navigationApi.navigateByUrl('/home', { replaceUrl: true });

    expect(HistoryApiMock.replaceState).toHaveBeenCalled();
  });

  it('should handle fragment', () => {
    navigationApi.navigateByUrl('/home', { fragment: 'fragment' });
    expect(HistoryApiMock.pushState).toHaveBeenCalledWith(
      null,
      '',
      '/home#fragment',
    );
  });
});