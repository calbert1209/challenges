import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPayment } from '../post-payment';
import { actions } from '../actions';

const kPaymentAmounts = [10, 20, 50, 100, 500];

/**
 * prepare message to be shown in banner
 * @param {number} amount
 * @param {string} currency
 * @param {string} charityName
 * @returns string
 */
const formatThankYouMessage = (amount, currency, charityName) => {
  // TODO l10n
  return `Thank you for donating ${amount} ${currency} to ${charityName}`;
};

/**
 *
 * @param {Charity} option
 * @param {number} donationsReceived total donations received
 * @returns JSX.Element
 */
export const DonationOptionCard = ({ option, donationsReceived }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const dispatch = useDispatch();

  const onClickDonate = () => {
    setPaymentAmount(0);
    setDialogOpen((s) => !s);
  };

  const onClickRadioButton = (amt) => {
    setPaymentAmount(amt);
  };

  const onClickPay = async () => {
    const { id, currency, name } = option;
    try {
      const postedPayment = await postPayment(id, paymentAmount, currency);

      dispatch(actions.addPayment(postedPayment));
      const msg = formatThankYouMessage(paymentAmount, currency, name);
      dispatch(actions.updateMessage(msg));
    } catch (error) {
      console.error(error);
    }
  };
  const style = {
    backgroundImage: `url(./images/${option.image})`,
  };
  return (
    <div className="DonationOptionCard" style={style}>
      <div className="cardFrontOverlay" data-open={dialogOpen}>
        <div className="overlayTitle">
          <div className="charityName">{option.name}</div>
          {dialogOpen ? (
            <CloseButton
              className="closeOverlayButton"
              onClick={onClickDonate}
              fill={'#687389'}
            />
          ) : (
            <button className="donateButton" onClick={onClickDonate}>
              {/* TODO: l10n */}
              {'Donate'}
            </button>
          )}
        </div>
        <div className="dialogContent" data-show={dialogOpen}>
          <div className="paymentAmountGuidance">
            {/* TODO: l10n */}
            {`${'Select the amount to donate'} (${option.currency})`}
          </div>
          <div className="paymentOptions">
            {kPaymentAmounts.map((amount, i) => (
              <PaymentAmountOption
                key={amount}
                amount={amount}
                onClick={onClickRadioButton}
                checked={amount === paymentAmount}
              />
            ))}
          </div>
          <div className="paymentActionButtonContainer">
            <button className="payButton" onClick={onClickPay}>
              {/* TODO: l10n */}
              {'Pay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 *
 * @param {() => void} onClick
 * @param {string} className
 * @param {string} fill the rgb fill color in hex
 * @param {number?} opacity, defaults to 1
 * @returns JSX.Element
 */
const CloseButton = ({ onClick, className, fill = '#000000', opacity = 1 }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill={fill}
        opacity={opacity}
      >
        <path
          d={
            'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 ' +
            '6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'
          }
        />
      </svg>
    </div>
  );
};

/**
 *
 * @param {number} amount payment amount
 * @param {() => void} onClick
 * @param {boolean} checked
 * @returns JSX.Element
 */
const PaymentAmountOption = ({ amount, onClick, checked }) => {
  return (
    <div className="paymentAmount" onClick={() => onClick(amount)}>
      <div data-checked={checked} className="paymentAmountRadioButton" />
      <div className="paymentAmountText">{amount}</div>
    </div>
  );
};
