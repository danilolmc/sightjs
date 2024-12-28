export function lazy<T>(
  component: () => Promise<{ default: T }>,
): () => Promise<T> {
  return async () => {
    const module = await component();
    return module.default;
  };
}
