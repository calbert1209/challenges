import { actions } from '../actions';

describe('updateDonationTotal', () => {
  test('should create action with correct type and total', () => {
    const fakePayments = [10, 20, 50, 100, 500].map((amount) => ({ amount }));
    expect(actions.updateDonationTotal(fakePayments)).toMatchObject({
      type: 'UPDATE_DONATION_TOTAL',
      donationTotal: 10 + 20 + 50 + 100 + 500,
    });
  });

  test('should create action with correct type and message', () => {
    const message = 'Thank you for your donation';
    expect(actions.updateMessage(message)).toMatchObject({
      type: 'UPDATE_MESSAGE',
      message,
    });
  });
});
