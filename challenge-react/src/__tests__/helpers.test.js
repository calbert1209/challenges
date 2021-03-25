import { handlePay, sum } from '../helpers';

describe('helpers', () => {
  describe('sum', () => {
    test('given an array of numbers, should return their sum', () => {
      expect(sum([1, 2, 3, 4])).toEqual(10);
    });
  });
});

describe('handlePay', () => {
  test('should dispatch message action', () => {
    const amount = 500;
    const currency = 'CAD';
    const dispatch = jest.fn();
    handlePay(1, amount, currency, dispatch);

    expect(dispatch).toBeCalledWith({
      type: 'UPDATE_MESSAGE',
      message: `Thank you for donating ${amount} ${currency}`,
    });
  });
});
