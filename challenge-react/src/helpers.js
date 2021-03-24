/**
 * sums the provided array of numbers
 *
 * @param {number[]} values numbers to sum
 *
 */
export const sum = (values) =>
  values.reduce((accumulator, value) => accumulator + value, 0);
