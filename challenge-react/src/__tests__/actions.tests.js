import { actions } from '../actions';

describe('setMessage', () => {
  test('should create action with correct type and message', () => {
    const message = 'Thank you for your donation';
    expect(actions.setMessage(message)).toMatchObject({
      type: 'UPDATE_MESSAGE',
      message,
    });
  });
});

describe('setCharities', () => {
  const fakeCharities = [
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

  const setCharitiesAction = actions.setCharities(fakeCharities);

  test('should create action with correct type', () => {
    expect(setCharitiesAction.type).toEqual('SET_CHARITIES');
  });

  test('should create action with correct payload', () => {
    expect(setCharitiesAction.charities).toMatchObject(fakeCharities);
  });
});

describe('setPayments', () => {
  const fakePayments = [
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

  const setPaymentsAction = actions.setPayments(fakePayments);
  test('should create action with correct type', () => {
    expect(setPaymentsAction.type).toEqual('SET_PAYMENTS');
  });

  test('should create action with correct payload', () => {
    expect(setPaymentsAction.payments).toMatchObject(fakePayments);
  });
});

describe('addPayment', () => {
  const added = {
    charitiesId: 4,
    amount: 20,
    currency: 'THB',
    id: 4,
  };

  const addPaymentAction = actions.addPayment(added);
  test('should create action with correct type', () => {
    expect(addPaymentAction.type).toEqual('ADD_PAYMENT');
  });

  test('should create action with correct payload', () => {
    expect(addPaymentAction.payment).toMatchObject(added);
  });
});

describe('setError', () => {
  const error = {
    title: 'invalid amp setting',
    message: 'max volume is 10',
  };

  const setErrorAction = actions.setError(error);

  test('should create action with correct type', () => {
    expect(setErrorAction.type).toEqual('SET_ERROR');
  });

  test('should create action with correct payload', () => {
    expect(setErrorAction.error).toMatchObject(error);
  });
});
