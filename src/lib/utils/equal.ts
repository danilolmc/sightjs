export function areEqual(value1: unknown, value2: unknown) {
  if (value1 === value2) {
    return true;
  }

  if (
    typeof value1 === 'number' &&
    typeof value2 === 'number' &&
    isNaN(value1) &&
    isNaN(value2)
  ) {
    return true;
  }

  if (value1 == null || value2 == null) {
    return false;
  }

  if (typeof value1 !== typeof value2) {
    return false;
  }

  if (typeof value1 === 'object' && typeof value2 === 'object') {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) return false;
      for (let i = 0; i < value1.length; i++) {
        if (!areEqual(value1[i], value2[i])) return false;
      }
      return true;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (
        !keys2.includes(key) ||
        !areEqual(
          (value1 as Record<string, unknown>)[key],
          (value2 as Record<string, unknown>)[key],
        )
      ) {
        return false;
      }
    }
    return true;
  }

  return false;
}
