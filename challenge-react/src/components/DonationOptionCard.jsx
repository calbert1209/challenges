import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { handlePay } from '../helpers';

const CardStyle = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

const kPaymentAmounts = [10, 20, 50, 100, 500];

export const DonationOptionCard = ({ option }) => {
  const dispatch = useDispatch();
  const [paymentAmount, setPaymentAmount] = useState(kPaymentAmounts[0]);
  const onClickPay = useCallback(() => {
    handlePay(option.id, paymentAmount, option.currency, dispatch);
  }, [option.id, option.currency, paymentAmount]);

  return (
    <CardStyle>
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
        'Pay'
      </button>
    </CardStyle>
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
