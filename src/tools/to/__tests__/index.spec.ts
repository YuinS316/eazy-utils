import { describe, expect, it } from 'vitest';
import { to } from '..';

function mockSuccess() {
  return Promise.resolve('success');
}

function mockFail(): Promise<string> {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(('fail'));
}

describe('to', () => {
  it('should catch error', async () => {
    const [err, value] = await to(mockFail());
    expect(err).toBe('fail');
    expect(value).toBe(undefined);
  });

  it('should get resolve value', async () => {
    const [err, value] = await to(mockSuccess());
    expect(err).toBe(null);
    expect(value).toBe('success');
  });
});
