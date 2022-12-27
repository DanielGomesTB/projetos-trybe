import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPICurrencies, fetchAPIExchange, changeEditor } from '../redux/actions';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  clearInput = () => {
    this.setState({
      value: '',
      description: '',
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { fetchExchange, editorChange } = this.props;
    fetchExchange(this.state);
    this.clearInput();
    editorChange();
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Despesas
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição das Despesas
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map((coin) => (
              <option key={ coin } value={ coin }>{coin}</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  fetchExchange: PropTypes.func,
  fetchCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchAPICurrencies()),
  fetchExchange: (state) => dispatch(fetchAPIExchange(state)),
  editorChange: () => dispatch(changeEditor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
