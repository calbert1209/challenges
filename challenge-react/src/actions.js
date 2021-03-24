import { sum } from './helpers';

export const actionTypes = {
  updateDonationTotal: 'UPDATE_DONATION_TOTAL',
  updateMessage: 'UPDATE_MESSAGE',
};

const updateDonationTotal = (payments) => {
  const donations = payments.map((payment) => payment.amount);
  const donationTotal = sum(donations);
  return {
    type: actionTypes.updateDonationTotal,
    donationTotal,
  };
};

const updateMessage = (message) => ({
  type: actionTypes.updateMessage,
  message,
});

export const actions = {
  updateDonationTotal,
  updateMessage,
};
