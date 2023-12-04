import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { isAxiosError } from 'axios';
import { mockGetFail, mockGetSuccess, server } from '../mocks/server';
import { Request } from '..';

describe('Axios', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should return data normally', () => {
    mockGetSuccess();

    const fetch = new Request({
      baseURL: 'http://localhost',
    });
    const res = fetch.get('/api/abc');

    expect(res).to.resolves.toEqual({ data: 'abc' });
  });

  it('should return axiosError', () => {
    mockGetFail();

    const fetch = new Request({
      baseURL: 'http://localhost',
    });
    const res = fetch.get('/api/fail');

    expect(res).to.rejects.toSatisfy(isAxiosError);
  });

  describe('test interceptor', () => {
    it('should instance request interceptor work', async () => {
      const reqFn = vi.fn(config => config);
      const resFn = vi.fn(res => res);
      mockGetSuccess();

      const fetch = new Request({
        baseURL: 'http://localhost',
        interceptors: {
          requestInterceptors: reqFn,
          responseInterceptors: resFn,
        },
      });
      const res = await fetch.get('/api/abc');

      expect(res).toEqual({ data: 'abc' });
      expect(reqFn).toBeCalled();
      expect(resFn).toBeCalled();
    });

    it('should specified request interceptor work', async () => {
      const reqFn = vi.fn(config => config);
      const resFn = vi.fn(res => res);
      mockGetSuccess();

      const fetch = new Request({
        baseURL: 'http://localhost',
      });
      const res = await fetch.get('/api/abc', {}, {
        interceptors: {
          requestInterceptors: reqFn,
          responseInterceptors: resFn,
        },
      });

      expect(res).toEqual({ data: 'abc' });
      expect(reqFn).toBeCalled();
      expect(resFn).toBeCalled();
    });
  });
});
