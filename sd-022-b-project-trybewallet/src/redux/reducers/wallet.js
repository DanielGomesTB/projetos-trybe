import { GET_CURRENCY, GET_EXCHANGE, REMOVE_EXPENSE, EDIT_EXPENSE,
  CHANGE_EDITOR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
    };
  case GET_EXCHANGE:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.state,
        id: state.expenses.length,
        exchangeRates: action.data }],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => (
        Number(element.id) !== Number(action.payload)
      )),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case CHANGE_EDITOR:
    return {
      ...state,
      editor: false,
    };
  default:
    return state;
  }
}

export default wallet;
