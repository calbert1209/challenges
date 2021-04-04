export const enUS = {
  /**
   * Tamboon React
   */
  mainPageTitle: 'Tamboon React',
  /**
   * `Total Donations: ${total}`
   * @param {number} total total of all donations
   * @returns string
   */
  headerDonationTotal: (total) => `Total Donations: ${total} THB`,
  /**
   * `Thank you for donating ${amount} ${currency} to ${charityName}`
   * @param {number} amount amount of money donated
   * @param {string} currency currency of money donated
   * @param {string} charityName name of charity money was donated to
   * @returns string
   */
  thankYouMsg: (amount, currency, charityName) =>
    `Thank you for donating ${amount} ${currency} to ${charityName}`,
  /**
   * Donate
   */
  donate: 'Donate',
  /**
   * `${total} ${currency} donated so far`
   * @param {number} total amount of donated funds
   * @param {string} currency currency of funds
   * @returns string
   */
  donationsSoFar: (total, currency) => `${total} ${currency} donated so far`,
  /**
   * `Select donation amount (${currency})`
   * @param {string} currency currency of payment options
   * @returns string
   */
  donationAmountGuidance: (currency) => `Select donation amount (${currency})`,
  /**
   * Pay
   */
  pay: 'Pay',
  /**
   * Please confirm your donation
   */
  donationConfirmationTitle: 'Please confirm your donation',
  /**
   * `Donate ${amount} ${currency} to ${charityName}?`
   * @param {number} amount amount of money to be donated
   * @param {string} currency currency of money to be donated
   * @param {string} charityName name of charity to be donated
   * @returns string
   */
  donationConfirmationMsg: (amount, currency, charityName) =>
    `Donate ${amount} ${currency} to ${charityName}?`,
  /**
   * 'This transaction will be completed only if you click "Confirm"'
   */
  donationConfirmationGuidance:
    'This transaction will be completed only if you click "Confirm"',
  /**
   * Cancel
   */
  cancel: 'Cancel',
  /**
   * Close
   */
  close: 'Close',
  /**
   * Confirm
   */
  confirm: 'Confirm',
  /**
   * Could not get Charities
   */
  couldNotGetCharitiesTitle: 'Could not get Charities',
  /**
   * An error occurred while trying to get list of charities
   */
  couldNotGetCharitiesMsg:
    'An error occurred while trying to get list of charities',
  /**
   * Could not get Payments
   */
  couldNotGetPaymentsTitle: 'Could not get Payments',
  /**
   * An error occurred while trying to get payment history
   */
  couldNotGetPaymentsMsg:
    'An error occurred while trying to get payment history',
  /**
   * Error in Payment Processing
   */
  paymentProcessingErrorAlertTitle: 'Error in Payment Processing',
  /**
   * Funds were not deducted from your balance, because of the following error:
   */
  paymentProcessingErrorAlertMsg:
    'Funds were not deducted from your balance, because of the following error:',
};
