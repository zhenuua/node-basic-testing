import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const nextEmptyElement = {
    value: null,
    next: null,
  };

  test('should generate linked list from values 1', () => {
    const list = ['value1'];
    const linkedList = generateLinkedList(list);
    expect(linkedList).toStrictEqual({
      value: 'value1',
      next: nextEmptyElement,
    });
  });

  test('should generate linked list from values 2', () => {
    const list = ['value1', 'value2'];
    const linkedList = generateLinkedList(list);
    expect(linkedList).toMatchSnapshot({
      value: 'value1',
      next: {
        value: 'value2',
        next: nextEmptyElement,
      },
    });
  });
});
