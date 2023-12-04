import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

export const server = setupServer();

const BASE_URL = 'http://localhost';

function mockGetReturn<T extends object>(url: string, data: T) {
  server.use(http.get(BASE_URL + url, () => {
    return HttpResponse.json(data, { status: 200 });
  }));
}

export function mockGetSuccess() {
  mockGetReturn('/api/abc', { data: 'abc' });
}

export function mockGetFail() {
  server.use(http.get(`${BASE_URL}/api/fail`, () => {
    return new HttpResponse(null, { status: 500 });
  }));
}
