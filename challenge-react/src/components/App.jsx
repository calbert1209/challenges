import React, { useEffect, useMemo, useState } from 'react';
import { DonationOptionCard } from './DonationOptionCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions';
import { ErrorAlertModal } from './Modal.jsx';
import { useLocale } from '../locales/locales.jsx';

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
  const t = useLocale();

  useEffect(() => {
    window
      .fetch(kCharitiesApiUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((charities) => {
        dispatch(actions.setCharities(charities));
      })
      .catch((error) => {
        dispatch(
          actions.setError({
            title: t.couldNotGetCharitiesTitle,
            message: t.couldNotGetCharitiesMsg,
            original: error,
          })
        );
      });

    window
      .fetch(kPaymentsApiUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((payments) => {
        dispatch(actions.setPayments(payments));
      })
      .catch((error) => {
        dispatch(
          actions.setError({
            title: t.couldNotGetPaymentsTitle,
            message: t.couldNotGetPaymentsMsg,
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
        <h1 className="headerTitle">{t.mainPageTitle}</h1>
        <p className="headerDonationTotal">
          {t.headerDonationTotal(donationTotal)}
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
