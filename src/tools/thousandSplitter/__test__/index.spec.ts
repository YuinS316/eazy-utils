import { describe, expect, it, vi } from 'vitest';
import { thousandSplitter } from '..';

describe('test thousandSplitter', () => {
  it('test num < 1000', async () => {
    expect(thousandSplitter(1)).toBe('1');
    expect(thousandSplitter(12)).toBe('12');
    expect(thousandSplitter(123)).toBe('123');
  });

  it('test num >= 1000', async () => {
    expect(thousandSplitter(1000)).toBe('1,000');
    expect(thousandSplitter(12345)).toBe('12,345');
    expect(thousandSplitter(123456)).toBe('123,456');
    expect(thousandSplitter(1234567)).toBe('1,234,567');
  });
});
