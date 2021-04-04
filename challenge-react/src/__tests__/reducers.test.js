import { mainReducer } from '../reducers';

describe('mainReducer', () => {
  describe('should return correctly updated new version of state', () => {
    const baseState = {
      message: '',
      charities: [],
      payments: [],
      error: null,
      locale: 'en-US',
    };

    const charities = [
      {
        id: 1,
        name: 'Baan Kru Noi',
        image: 'baan-kru-noi.jpg',
        currency: 'THB',
      },
      {
        id: 2,
        name: 'Habitat for Humanity Thailand',
        image: 'habitat-for-humanity-thailand.jpg',
        currency: 'THB',
      },
      {
        id: 3,
        name: 'Paper Ranger',
        image: 'paper-ranger.jpg',
        currency: 'THB',
      },
    ];

    const payments = [
      {
        charitiesId: 2,
        amount: 10,
        currency: 'THB',
        id: 1,
      },
      {
        charitiesId: 1,
        amount: 20,
        currency: 'THB',
        id: 2,
      },
      {
        charitiesId: 3,
        amount: 50,
        currency: 'THB',
        id: 3,
      },
    ];

    const error = {
      title: 'An error has occurred',
      message: 'Do not panic, help is on the way.',
      original: new Error('FAKE: Error in processing'),
    };

    test('setMessage', () => {
      const message =
        'Thank you for donating 50 THB to Habitat for Humanity Thailand';
      const nextState = mainReducer(baseState, {
        type: 'SET_MESSAGE',
        message,
      });
      expect(nextState).toMatchObject({ ...baseState, message });
    });

    test('setCharities', () => {
      const nextState = mainReducer(baseState, {
        type: 'SET_CHARITIES',
        charities,
      });
      expect(nextState).toMatchObject({ ...baseState, charities });
    });

    test('setPayments', () => {
      const nextState = mainReducer(baseState, {
        type: 'SET_PAYMENTS',
        payments,
      });
      expect(nextState.payments).toMatchObject(payments);
    });

    test('addPayment', () => {
      const stateWithPayments = { ...baseState, payments };
      const addedPayment = {
        charitiesId: 4,
        amount: 10,
        currency: 'THB',
        id: 4,
      };

      const nextState = mainReducer(stateWithPayments, {
        type: 'ADD_PAYMENT',
        payment: addedPayment,
      });
      expect(nextState.payments).toMatchObject([...payments, addedPayment]);
    });

    test('setError', () => {
      const nextState = mainReducer(baseState, { type: 'SET_ERROR', error });
      expect(nextState).toMatchObject({ ...baseState, error });
    });

    test('setError (to null)', () => {
      const stateWithError = { ...baseState, error };

      const nextState = mainReducer(stateWithError, {
        type: 'SET_ERROR',
        error: null,
      });
      expect(nextState).toMatchObject({ ...baseState, error: null });
    });

    test('setLocale', () => {
      const locale = 'ja-JP';

      const nextState = mainReducer(baseState, { type: 'SET_LOCALE', locale });
      expect(nextState).toMatchObject({ ...baseState, locale });
    });

    test('invalid actionType should return state as-is', () => {
      const title = 'please make merit';

      const nextState = mainReducer(baseState, { type: 'SET_TITLE', title });
      expect(Object.is(nextState, baseState)).toBe(true);
    });
  });
});
