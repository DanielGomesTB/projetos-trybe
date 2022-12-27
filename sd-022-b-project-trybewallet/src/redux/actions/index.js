// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_EXCHANGE = 'GET_EXCHANGE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CHANGE_EDITOR = 'CHANGE_EDITOR';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const changeEditor = (payload) => ({
  type: CHANGE_EDITOR,
  payload,
});

export const getCurrency = (currency) => ({
  type: GET_CURRENCY,
  currencies: Object.keys(currency),
});

const fetchApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};

export const fetchAPICurrencies = () => async (dispatch) => {
  const data = await fetchApi();
  delete data.USDT;
  dispatch(getCurrency(data));
};

export const getExchange = (dataAndState) => ({
  type: GET_EXCHANGE,
  data: dataAndState.data,
  state: dataAndState.state,
});

export const fetchAPIExchange = (state) => async (dispatch) => {
  const data = await fetchApi();
  dispatch(getExchange({ data, state }));
};
