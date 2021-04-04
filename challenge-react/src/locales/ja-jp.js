export const jaJP = {
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
    `${charityName}へ${currency} ${amount}の寄付をありがとうございました`,
  /**
   * Donate
   */
  donate: '寄付',
  /**
   * `${total} ${currency} donated so far`
   * @param {number} total amount of donated funds
   * @param {string} currency currency of funds
   * @returns string
   */
  donationsSoFar: (total, currency) =>
    `今までいただいた寄付の合計：${total} ${currency}`,
  /**
   * `Select donation amount (${currency})`
   * @param {string} currency currency of payment options
   * @returns string
   */
  donationAmountGuidance: (currency) => `寄付額を選んでください(${currency})`,
  /**
   * Pay
   */
  pay: '支払う',
  /**
   * Please confirm your donation
   */
  donationConfirmationTitle: '寄付を確認してください',
  /**
   * `Donate ${amount} ${currency} to ${charityName}?`
   * @param {number} amount amount of money to be donated
   * @param {string} currency currency of money to be donated
   * @param {string} charityName name of charity to be donated
   * @returns string
   */
  donationConfirmationMsg: (amount, currency, charityName) =>
    `${charityName}に${currency} ${amount}を寄付します。よろしいですか？`,
  /**
   * 'This transaction will be completed only if you click "Confirm"'
   */
  donationConfirmationGuidance: '「確認」を押すと寄付は完了します',
  /**
   * Cancel
   */
  cancel: 'キャンセル',
  /**
   * Close
   */
  close: '閉じる',
  /**
   * Confirm
   */
  confirm: '確認',
  /**
   * Could not get Charities
   */
  couldNotGetCharitiesTitle: '慈善団体のリストが取得できませんでした',
  /**
   * An error occurred while trying to get list of charities
   */
  couldNotGetCharitiesMsg: '慈善団体のリストの取得中にエラーが発生しました。',
  /**
   * Could not get Payments
   */
  couldNotGetPaymentsTitle: '寄付歴が取得できませんでした',
  /**
   * An error occurred while trying to get payment history
   */
  couldNotGetPaymentsMsg: '寄付歴の取得中にエラーが発生しました',
  /**
   * Error in Payment Processing
   */
  paymentProcessingErrorAlertTitle: '寄付の処理中にエラーが発生しました。',
  /**
   * Funds were not deducted from your balance, because of the following error:
   */
  paymentProcessingErrorAlertMsg:
    '下記のエラーが発生したため、口座からお金を引き落とされていませんでした。',
};
