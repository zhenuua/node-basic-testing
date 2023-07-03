import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'foo'),
    mockTwo: jest.fn(() => 'bar'),
    mockThree: jest.fn(() => 'baz'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockFunctions = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockFunctions).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const mockFunctions = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(mockFunctions).toHaveBeenCalledWith('I am not mocked');
  });
});
