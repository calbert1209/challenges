import React, { createContext, useContext } from 'react';

// TODO: ideally there should be one file per locale
const enUS = {
  /**
   * Tamboon React
   */
  mainPageTitle: 'Tamboon React',
  headerDonationTotal: (total) => `Total Donations: ${total}`,
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
  paymentAmountGuidance: (currency) => `Select donation amount (${currency})`,
  /**
   * Pay
   */
  pay: 'Pay',
  /**
   * Please confirm your donation
   */
  paymentConfirmationTitle: 'Please confirm your donation',
  /**
   * `Donate ${amount} ${currency} to ${charityName}?`
   * @param {number} amount amount of money to be donated
   * @param {string} currency currency of money to be donated
   * @param {string} charityName name of charity to be donated
   * @returns string
   */
  paymentConfirmationMsg: (amount, currency, charityName) =>
    `Donate ${amount} ${currency} to ${charityName}?`,
  /**
   * 'This transaction will be completed only if you click "Confirm"'
   */
  paymentConfirmationGuidance:
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

const localeContext = createContext(enUS);

/**creates a context provider that swaps its value per the locale name argument
 *
 * @returns (locale: string, children: any) => JSX.Element
 */
export const createLocalProvider = () => {
  return ({ locale, children }) => {
    // TODO: switch between dictionaries per locale parameter
    const localizedStrings = enUS;
    return (
      <localeContext.Provider value={localizedStrings}>
        {children}
      </localeContext.Provider>
    );
  };
};

export const useLocale = () => {
  return useContext(localeContext);
};
