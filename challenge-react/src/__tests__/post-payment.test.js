import { postPayment, areValidPaymentArgs } from '../post-payment';

describe('postPayment', () => {
  const url = 'http://localhost:3001/payments/';
  const payload = {
    charitiesId: 4,
    amount: 20,
    currency: 'THB',
  };
  const mock201Fetch = jest.fn(() => ({
    status: 201,
    json: () => Promise.resolve({ ...payload, id: 0 }),
  }));

  test('should call fetch with correct payload', async () => {
    await postPayment(4, 20, 'THB', mock201Fetch);
    expect(mock201Fetch).toBeCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  });

  test('should throw when args are invalid', async () => {
    await expect(
      postPayment(4, '10', 'THB', mock201Fetch)
    ).rejects.toBeInstanceOf(Error);
  });

  test('should throw when response is not 201', async () => {
    const mock404Fetch = () => ({
      status: 404,
      json: () => {},
    });

    await expect(
      postPayment(4, 10, 'THB', mock404Fetch)
    ).rejects.toBeInstanceOf(Error);
  });
});

describe('areValidPaymentArgs', () => {
  test('should return false when id type is incorrect', () => {
    const validity = areValidPaymentArgs('4', 20, 'THB');

    expect(validity).toBe(false);
  });

  test('should return false when amount type is incorrect', () => {
    const validity = areValidPaymentArgs(4, '20', 'THB');

    expect(validity).toBe(false);
  });

  test('should return false when amount type is incorrect', () => {
    const validity = areValidPaymentArgs(4, 20, null);

    expect(validity).toBe(false);
  });

  test('should return true when payment is valid', () => {
    const validity = areValidPaymentArgs(4, 20, 'THB');

    expect(validity).toBe(true);
  });
});
