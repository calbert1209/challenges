const kPaymentSchema = {
  id: 'number',
  charitiesId: 'number',
  amount: 'number',
  currency: 'string',
};

const kPostPaymentApiUrl = 'http://localhost:3001/payments/';

// TODO: in a real app, there would probably be more stringent requirements
// for values to be passed to the API

/**
 * tests if object is a valid payment
 *
 * @param {any} charitiesId
 * @param {any} amount
 * @param {any} currency
 * @returns boolean
 */
export const areValidPaymentArgs = (charitiesId, amount, currency) => {
  const payment = { charitiesId, amount, currency };
  for (const [key, value] of Object.entries(payment)) {
    if (typeof value !== kPaymentSchema[key]) {
      return false;
    }
  }

  return true;
};

/**
 * Handle pay button
 *
 * @param {number} id The charity's Id
 * @param {number} amount The amount selected
 * @param {string} currency The currency
 * @param {function?} fetch defaults to window.fetch
 * @returns {Promise<{
 *   id: number,
 *   charitiesId: number,
 *   amount: number,
 *   currency: string
 * }>}
 */
export async function postPayment(id, amount, currency, fetch = window.fetch) {
  if (!areValidPaymentArgs(id, amount, currency)) {
    throw new Error('InvalidPaymentArguments');
  }

  const payload = { charitiesId: id, amount, currency };
  const resp = await fetch(kPostPaymentApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (resp.status !== 201) {
    throw new Error('PaymentProcessError: could not update payment data');
  }

  return resp.json();
}
