export type ComputedCallback<T> = () => T;
export type Effect = () => void | Promise<void>;

export interface WritableSignal<T> {
  (): T;
  set: (value: T) => void;
}

export interface ReadableSignal<T> {
  (): T;
}

export interface ResourceParams<T, R> {
  param?: WritableSignal<T>;
  loader: (params: LoaderParams<T>) => Promise<R> | R;
}

export interface ResourceReadable<R> {
  loading: WritableSignal<boolean>;
  error: WritableSignal<Error>;
  value: WritableSignal<R>;
  refresh: () => void;
}

export interface LoaderParams<T> {
  param: WritableSignal<T>;
  abortSignal: AbortSignal;
}
