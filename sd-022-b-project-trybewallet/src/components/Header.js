import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Header extends Component {
  calc = () => {
    const { expenses } = this.props;
    const result = expenses.reduce((acc, curr) => {
      const { value, exchangeRates, currency } = curr;
      return acc + (Number(value) * Number(exchangeRates[currency].ask));
    }, 0);
    return result.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">
          {`Olá ${email}`}
        </h2>
        {/* <h3 data-testid="total-field">{`Despesas: ${account}`}</h3>
        <h3 data-testid="header-currency-field">{`${coin}`}</h3> */}
        <h3 data-testid="total-field">
          {this.calc()}
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: Proptypes.string,
  expense: Proptypes.array,
  // account: Proptypes.number.isRequired,
  // coin: Proptypes.string.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  // account: state.user.account,
  // coin: state.user.coin,
});

export default connect(mapStateToProps)(Header);
