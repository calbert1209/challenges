import { sum } from '../helpers';

describe('helpers', () => {
  describe('sum', () => {
    test('given an array of numbers, should return their sum', () => {
      expect(sum([1, 2, 3, 4])).toEqual(10);
    });
  });
});
