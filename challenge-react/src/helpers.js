import { actions } from './actions';

/**
 * sums the provided array of numbers
 *
 * @param {number[]} values numbers to sum
 *
 */
export const sum = (values) =>
  values.reduce((accumulator, value) => accumulator + value, 0);

// TODO move to new file with other api call methods

/**
 * Handle pay button
 * 
 * @param {number} id The charity's Id
 * @param {number} amount The amount selected
 * @param {string} currency The currency
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
 */
export function handlePay(id, amount, currency, dispatch) {
  dispatch(
    actions.updateMessage(`Thank you for donating ${amount} ${currency}`)
  );
}
