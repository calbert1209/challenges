import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handlePay } from '../helpers';

const kPaymentAmounts = [10, 20, 50, 100, 500];

export const DonationOptionCardFront = ({ option }) => {
  const onClickPay = () => console.log('donate clicked');

  const style = {
    backgroundImage: `url(./images/${option.image})`,
  };
  return (
    <div className="donationOptionCardFront" style={style}>
      <div className="cardFrontFooter">
        <div>{option.name}</div>
        <button className="donateButton" onClick={onClickPay}>
          {/* TODO: l10n */}
          {'Donate'}
        </button>
      </div>
    </div>
  );
};

export const DonationOptionCardObverse = ({ option }) => {
  const dispatch = useDispatch();
  const [paymentAmount, setPaymentAmount] = useState(kPaymentAmounts[0]);
  const onClickPay = useCallback(() => {
    handlePay(option.id, paymentAmount, option.currency, dispatch);
  }, [option.id, option.currency, paymentAmount]);

  return (
    <div className="donationOptionCard">
      <div>{option.name}</div>
      {kPaymentAmounts.map((amount, i) => (
        <PaymentAmountOption
          key={amount}
          amount={amount}
          onClick={setPaymentAmount}
        />
      ))}
      <button onClick={onClickPay}>
        {/* TODO: l10n */}
        {'Pay'}
      </button>
    </div>
  );
};

const PaymentAmountOption = ({ amount, onClick }) => {
  return (
    <label>
      <input type="radio" name="payment" onClick={() => onClick(amount)} />
      {amount}
    </label>
  );
};
