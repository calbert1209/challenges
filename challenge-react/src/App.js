import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { DonationOptionCard } from './components/DonationOptionCard';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './actions';

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
      .then(setCharities)
      .catch((e) => {
        dispatch(actions.updateMessage(e));
      });

    fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then((payments) => {
        dispatch(actions.updateDonationTotal(payments));
      })
      .catch((e) => {
        dispatch(actions.updateMessage(e));
      });
  }, []);

  return (
    <div>
      <h1>Tamboon React</h1>
      <p>All donations: {donationTotal}</p>
      {message && <Message>{message}</Message>}
      {charities.length > 0 &&
        charities.map(function (charity, i) {
          return <DonationOptionCard key={charity.id} option={charity} />;
        })}
    </div>
  );
};
