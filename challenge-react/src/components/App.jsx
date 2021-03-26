import React, { useEffect, useState } from 'react';
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
  const { message, donationTotal } = useSelector((s) => s);

  const [charities, setCharities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => {
        return resp.json();
      })
      .then(setCharities);

    fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then((payments) => {
        dispatch(actions.updateDonationTotal(payments));
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
            <DonationOptionCard key={charity.id} option={charity} />
          ))}
      </div>
    </div>
  );
};
