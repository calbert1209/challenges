import React, { useEffect, useMemo } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { DonationOptionCard } from './DonationOptionCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions';

const Message = styled.p`
  color: red;
  margin: 1em 0;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

export const App = () => {
  const dispatch = useDispatch();
  const { message, charities, payments } = useSelector((s) => s);

  const donationTotal = useMemo(() => {
    const donations = payments.map((payment) => payment.amount);
    return donations.reduce((sum, donation) => sum + donation, 0);
  }, [payments]);

  const donationsPerCharityMap = useMemo(() => {
    return payments.reduce((map, payment) => {
      const {charitiesId, amount} = payment;
      if ((charitiesId in map)) {
        map[charitiesId] += amount;
      } else {
        map[charitiesId] = amount;
      }
      
      return map;
    }, {});
  }, [payments]);

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => {
        return resp.json();
      })
      .then((charities) => {
        dispatch(actions.setCharities(charities));
      });

    fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then((payments) => {
        dispatch(actions.setPayments(payments));
      });
  }, []);

  return (
    <div>
      <header className="mainHeader">
        <h1 className="headerTitle">Tamboon React</h1>
        <p className="headerDonationTotal">
          {/* TODO l10n */}
          {`Total Donations: ${donationTotal}`}
        </p>
      </header>
      {message && <Message>{message}</Message>}
      <div className="cardGrid">
        {charities.length > 0 &&
          charities.map((charity) => (
            <DonationOptionCard
              key={charity.id}
              option={charity}
              donationsReceived={donationsPerCharityMap[charity.id]}
            />
          ))}
      </div>
    </div>
  );
};
