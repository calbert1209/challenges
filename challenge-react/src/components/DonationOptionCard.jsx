import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPayment } from '../post-payment';
import { actions } from '../actions';
import { ConfirmDonationModal } from './Modal.jsx';

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
 * @param {boolean} isOpen triggers open / close animation
 * @param {(number) => void} setOpen callback trigger self open or all closed
 * @returns JSX.Element
 */
export const DonationOptionCard = ({
  option,
  donationsReceived,
  isOpen,
  setOpen,
}) => {
  const [paymentAmount, setPaymentAmount] = useState(10);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const onOpen = () => {
    setPaymentAmount(10);
    setOpen(option.id);
  };

  const onClose = () => {
    setOpen(-1);
  };

  const onClickRadioButton = (amt) => {
    setPaymentAmount(amt);
  };

  const onClickPay = () => {
    setShowConfirm(true);
  };

  const onClickConfirm = async () => {
    const { id, currency, name } = option;
    try {
      const postedPayment = await postPayment(id, paymentAmount, currency);

      dispatch(actions.addPayment(postedPayment));
      const msg = formatThankYouMessage(paymentAmount, currency, name);
      dispatch(actions.updateMessage(msg));
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirm(false);
    }
  };

  const closeConfirmModal = () => {
    setShowConfirm(false);
  };

  const { name, image, currency } = option;

  const style = {
    backgroundImage: `url(./images/${image})`,
  };
  const currencyNote = `(${currency})`;
  return (
    <div className="DonationOptionCard" style={style}>
      <div className="cardFrontOverlay" data-open={isOpen}>
        <div className="overlayTitle">
          <div className="charityName">{name}</div>
          {isOpen ? (
            <CloseButton
              className="closeOverlayButton"
              onClick={onClose}
              fill={'#687389'}
            />
          ) : (
            <button className="borderedButton secondaryButton" onClick={onOpen}>
              {/* TODO: l10n */}
              {'Donate'}
            </button>
          )}
        </div>
        <div className="dialogContent" data-show={isOpen}>
          <div className="dialogContentGrid">
            <div className="donationsSoFar">
              {/* TODO: l10n */}
              {`Received so far: ${donationsReceived} ${currencyNote}`}
            </div>
            <div className="paymentAmountGuidance">
              {/* TODO: l10n */}
              {`Select the amount to donate ${currencyNote}`}
            </div>
            <div className="paymentOptions">
              {kPaymentAmounts.map((amount) => (
                <PaymentAmountOption
                  key={amount}
                  amount={amount}
                  onClick={onClickRadioButton}
                  checked={amount === paymentAmount}
                />
              ))}
            </div>
            <div className="paymentActionButtonContainer">
              <button
                className="borderedButton primaryButton"
                onClick={onClickPay}
              >
                {/* TODO: l10n */}
                {'Pay'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDonationModal
        show={showConfirm}
        onCancel={closeConfirmModal}
        onConfirm={onClickConfirm}
        amount={paymentAmount}
        currency={currency}
        charityName={name}
      />
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
