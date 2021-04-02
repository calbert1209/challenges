import React, { useEffect, useMemo, useState } from 'react';
import { DonationOptionCard } from './DonationOptionCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions';

const GratitudeMessage = ({ children }) => {
  return (
    <div className="gratitudeMessageContainer">
      <div className="gratitudeMessage">{children}</div>
    </div>
  );
};

export const App = () => {
  const dispatch = useDispatch();
  const { message, charities, payments } = useSelector((s) => s);

  const donationTotal = useMemo(() => {
    const donations = payments.map((payment) => payment.amount);
    return donations.reduce((sum, donation) => sum + donation, 0);
  }, [payments]);

  const donationsPerCharityMap = useMemo(() => {
    return payments.reduce((map, payment) => {
      const { charitiesId, amount } = payment;
      if (charitiesId in map) {
        map[charitiesId] += amount;
      } else {
        map[charitiesId] = amount;
      }

      return map;
    }, {});
  }, [payments]);

  const [openOptionId, setOpenOptionId] = useState(-1);

  useEffect(() => {
    window
      .fetch('http://localhost:3001/charities')
      .then((resp) => {
        return resp.json();
      })
      .then((charities) => {
        dispatch(actions.setCharities(charities));
      });

    window
      .fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then((payments) => {
        dispatch(actions.setPayments(payments));
      });
  }, []);

  return (
    <div id="app">
      <header className="mainHeader">
        <h1 className="headerTitle">Tamboon React</h1>
        <p className="headerDonationTotal">
          {/* TODO l10n */}
          {`Total Donations: ${donationTotal}`}
        </p>
      </header>
      {message && <GratitudeMessage>{message}</GratitudeMessage>}
      <div className="cardGrid">
        {charities.length > 0 &&
          charities.map((charity) => (
            <DonationOptionCard
              key={charity.id}
              option={charity}
              donationsReceived={donationsPerCharityMap[charity.id]}
              isOpen={openOptionId === charity.id}
              setOpen={setOpenOptionId}
            />
          ))}
      </div>
    </div>
  );
};
