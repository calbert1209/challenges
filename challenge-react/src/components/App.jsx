import React, { useEffect, useMemo, useState } from 'react';
import { DonationOptionCard } from './DonationOptionCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions';

const kCharitiesApiUrl = 'http://localhost:3001/charities';
const kPaymentsApiUrl = 'http://localhost:3001/payments';

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

  const [openOptionId, setOpenOptionId] = useState(-1);

  useEffect(() => {
    window
      .fetch(kCharitiesApiUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((charities) => {
        dispatch(actions.setCharities(charities));
      })
      .catch(console.error);

    window
      .fetch(kPaymentsApiUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((payments) => {
        dispatch(actions.setPayments(payments));
      })
      .catch(console.error);
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
              isOpen={openOptionId === charity.id}
              setOpen={setOpenOptionId}
            />
          ))}
      </div>
    </div>
  );
};
