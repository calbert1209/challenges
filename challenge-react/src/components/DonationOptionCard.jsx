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
 * @param {() => void} onClick
 * @returns JSX.Element
 */
const CloseButton = ({ onClick }) => {
  return (
    <div className="closeOverlayButton" onClick={onClick}>
      <img src="./images/close-icon.svg" alt="close icon X" />
    </div>
  );
};

/**
 *
 * @param {() => void} onClick
 * @returns JSX.Element
 */
const DonateButton = ({ onClick }) => {
  return (
    <button className="borderedButton secondaryButton" onClick={onClick}>
      {/* TODO: l10n */}
      {'Donate'}
    </button>
  );
};

/**
 *
 * @param {boolean} isOpen flag to trigger dialog opening
 * @param {number} paymentAmount currently selected amount
 * @param {string} currency the currency of the payment amount options
 * @param {(value: number) => void} onClickRadioButton callback to set amount
 * @param {() => void} onClickPay callback to trigger payment confirmation
 * @returns
 */
const DonateDialogContent = ({
  isOpen,
  paymentAmount,
  currency,
  onClickRadioButton,
  onClickPay,
}) => {
  return (
    <div className="dialogContent" data-show={isOpen}>
      <div className="dialogContentGrid">
        <div className="paymentAmountGuidance">
          {/* TODO: l10n */}
          {`Select the amount to donate (${currency})`}
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
          <button className="borderedButton primaryButton" onClick={onClickPay}>
            {/* TODO: l10n */}
            {'Pay'}
          </button>
        </div>
      </div>
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

/**
 *
 * @param {Charity} option
 * @param {boolean} isOpen triggers open / close animation
 * @param {(number) => void} setOpen callback trigger self open or all closed
 * @returns JSX.Element
 */
export const DonationOptionCard = ({ option, isOpen, setOpen }) => {
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
      dispatch(actions.setMessage(msg));
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

  return (
    <div className="DonationOptionCard" style={style}>
      <div className="cardFrontOverlay" data-open={isOpen}>
        <div className="overlayTitle">
          <div className="charityName">{name}</div>
          {isOpen ? (
            <CloseButton onClick={onClose} />
          ) : (
            <DonateButton onClick={onOpen} />
          )}
        </div>
        <DonateDialogContent
          isOpen={isOpen}
          paymentAmount={paymentAmount}
          currency={currency}
          onClickRadioButton={onClickRadioButton}
          onClickPay={onClickPay}
        />
      </div>
      <ConfirmDonationModal
        show={showConfirm}
        amount={paymentAmount}
        currency={currency}
        charityName={name}
        onCancel={closeConfirmModal}
        onConfirm={onClickConfirm}
      />
    </div>
  );
};
