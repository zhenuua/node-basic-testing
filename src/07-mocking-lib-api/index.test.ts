import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const relativePath = '/api/path';
  const mockResponse = { data: 'data' };
  beforeEach(() => {
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue(mockResponse);
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const url = 'https://jsonplaceholder.typicode.com';
    const dataAxiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(dataAxiosCreate).toBeCalledWith({
      baseURL: url,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mock = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue(mockResponse);
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(mock).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const respFromApi = await throttledGetDataFromApi(relativePath);
    expect(respFromApi).toBe(mockResponse.data);
  });
});
