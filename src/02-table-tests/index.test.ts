import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 5, action: 'incorrectAction', expected: null },
  { a: 'incorrectValue', b: 1, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('table tests', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
