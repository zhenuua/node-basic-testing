import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const resolvedValue = await resolveValue('test value');
    expect(resolvedValue).toBe('test value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('Err example');
    } catch (err) {
      expect((err as Error).message).toBe('Err example');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (err) {
      expect((err as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
