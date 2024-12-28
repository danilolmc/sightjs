import { signal } from '@/lib/core/signal';
import { effect } from '@/lib/core/effect';
import { ResourceParams, ResourceReadable } from '@/lib/core/types.ts';

export const resource = <T, R>(
  resource: ResourceParams<T, R>,
): ResourceReadable<R> => {
  let abortSignal = null;

  const request = {
    loading: signal(true),
    error: signal(null),
    value: signal(null),
    refresh: () => {
      return resource.loader({
        param: resource.param,
        abortSignal: abortSignal.signal,
      });
    },
  };

  effect(async () => {
    request.loading.set(true);

    if (abortSignal) {
      abortSignal.abort();
    }

    const controller = new AbortController();
    abortSignal = controller;

    try {
      const data = (await resource.loader({
        param: resource.param,
        abortSignal: controller.signal,
      })) as ReturnType<typeof resource.loader>;
      request.value.set(data);
    } catch (err) {
      request.error.set(err);
    } finally {
      request.loading.set(false);
    }
  });

  return request;
};
