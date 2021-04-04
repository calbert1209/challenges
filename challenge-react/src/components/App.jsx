import React, { useEffect, useMemo, useState } from 'react';
import { DonationOptionCard } from './DonationOptionCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../actions';
import { ErrorAlertModal } from './Modal.jsx';
import { localeTypes, useLocale } from '../locales/locales.jsx';

const kCharitiesApiUrl = 'http://localhost:3001/charities';
const kPaymentsApiUrl = 'http://localhost:3001/payments';

const GratitudeMessage = ({ children }) => {
  return (
    <div className="gratitudeMessageContainer">
      <div className="gratitudeMessage">{children}</div>
    </div>
  );
};
/**
 * component able to use locale context to show donation total header
 * @param {number} total donation total
 * @returns JSX.Element
 */
const DonationTotal = ({ total }) => {
  const { headerDonationTotal } = useLocale();
  return <p className="headerDonationTotal">{headerDonationTotal(total)}</p>;
};

/**
 * component to render locale switch buttons
 * @returns JSX.Element
 */
const LocaleFooter = () => {
  const dispatch = useDispatch();
  const currentLocale = useSelector((s) => s.locale);
  const createLocaleSetter = (locale) => () => {
    dispatch(actions.setLocale(locale));
  };
  return (
    <div className="localeFooter">
      <button
        className="textLinkButton"
        data-checked={currentLocale === localeTypes.enUS}
        onClick={createLocaleSetter(localeTypes.enUS)}
      >
        {'English'}
      </button>
      <button
        className="textLinkButton"
        data-checked={currentLocale === localeTypes.jaJP}
        onClick={createLocaleSetter(localeTypes.jaJP)}
      >
        {'日本語'}
      </button>
    </div>
  );
};

export const App = ({ LocaleProvider }) => {
  const dispatch = useDispatch();
  const { message, charities, payments, locale } = useSelector((s) => s);

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
    <LocaleProvider locale={locale}>
      <div id="app" lang={locale}>
        <header className="mainHeader">
          <h1 className="headerTitle">{t.mainPageTitle}</h1>
          <DonationTotal total={donationTotal} />
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
        <LocaleFooter />
        <ErrorAlertModal />
      </div>
    </LocaleProvider>
  );
};
