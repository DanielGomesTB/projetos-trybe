import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    isSaveButtonDisabled: true,
    password: '',
    email: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.buttonChange());
  }

  buttonChange = () => {
    const { email, password } = this.state;
    const minValue = 6;
    const emailValidation = /\S+@\S+\.\S+/;
    // regex retirado de: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (emailValidation.test(email) && password.length >= minValue) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, addUserDispatch } = this.props;
    addUserDispatch(email);
    history.push('/carteira');
  }

  render() {
    const {
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        Login
        <label htmlFor="email-input">
          Email
          <input
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            type="password"
            name="password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          onClick={ this.handleClick }
          type="submit"
          disabled={ isSaveButtonDisabled }
        >
          {' '}
          Entrar
          {' '}

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (email) => dispatch(addUser(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addUserDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
