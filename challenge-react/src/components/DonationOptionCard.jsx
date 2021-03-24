import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actions } from '../actions';

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
function handlePay(id, amount, currency, dispatch) {
  console.log('handlePay', { id, amount, currency });
  dispatch(
    actions.updateMessage(`Thank you for donating ${amount} ${currency}`)
  );
}
