import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs, { promises } from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setInterval).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    jest.runOnlyPendingTimers();
    expect(setInterval).toBeCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockPath = jest.spyOn(path, 'join');
    await readFileAsynchronously('file.txt');
    expect(mockPath).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const file = await readFileAsynchronously('file.txt');
    expect(file).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(promises, 'readFile').mockResolvedValue('Content');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const file = await readFileAsynchronously('file.txt');
    expect(file).toBe('Content');
  });
});
