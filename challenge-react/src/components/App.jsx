import React, { useEffect, useMemo, useState } from 'react';
import { DonationOptionCard } from './DonationOptionCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions';
import { ErrorAlertModal } from './Modal.jsx';

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
      })
      .catch((error) => {
        dispatch(
          // TODO: l10n
          actions.setError({
            title: 'Could not get Charities',
            message: 'An error occurred while trying to get list of charities',
            original: error,
          })
        );
      });

    window
      .fetch('http://localhost:3001/payments')
      .then((resp) => {
        return resp.json();
      })
      .then((payments) => {
        dispatch(actions.setPayments(payments));
      })
      .catch((error) => {
        // TODO: l10n
        dispatch(
          actions.setError({
            title: 'Could not get Payments',
            message: 'An error occurred while trying to get payment history',
            original: error,
          })
        );
      });
  }, []);

  useEffect(() => {
    if (message.length > 0) {
      setOpenOptionId(-1);
    }
  }, [message]);

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
      <ErrorAlertModal />
    </div>
  );
};
