import { areEqual } from '@/lib/utils/equal';
import { describe, expect, it } from 'vitest';

describe('areEqual function', () => {
  it('should return true for equal primitive values', () => {
    expect(areEqual(1, 1)).toBe(true);
    expect(areEqual('hello', 'hello')).toBe(true);
    expect(areEqual(true, true)).toBe(true);
  });

  it('should return false for unequal primitive values', () => {
    expect(areEqual(1, 2)).toBe(false);
    expect(areEqual('hello', 'world')).toBe(false);
    expect(areEqual(true, false)).toBe(false);
  });

  it('should return true for equal NaN values', () => {
    expect(areEqual(NaN, NaN)).toBe(true);
  });

  it('should return false for null and undefined comparisons', () => {
    expect(areEqual(null, undefined)).toBe(false);
  });

  it('should return true for identical null or undefined values', () => {
    expect(areEqual(null, null)).toBe(true);
    expect(areEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for values of different types', () => {
    expect(areEqual(1, '1')).toBe(false);
    expect(areEqual(true, 1)).toBe(false);
  });

  it('should return true for equal arrays', () => {
    expect(areEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('should return false for unequal arrays', () => {
    expect(areEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(areEqual([1, 2, 3], [1, 2])).toBe(false);
  });

  it('should return true for equal objects', () => {
    expect(areEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it('should return false for unequal objects', () => {
    expect(areEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(areEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it('should return true for recursive equal objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 3 } };
    expect(areEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for recursive unequal objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 4 } };
    expect(areEqual(obj1, obj2)).toBe(false);
  });
});
