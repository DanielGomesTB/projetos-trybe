import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      isSaveButtonDisabled: true,
      inputValue: '',
      loading: false,
    };
  }

  handleInput(event) {
    const { value } = event.target;
    const minValue = 3;
    if (value.length >= minValue) {
      this.setState({
        isSaveButtonDisabled: false,
        inputValue: value,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true });
    }
  }

  onClickButton = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    this.setState({ loading: true });
    createUser({ name: inputValue })
      .then(() => {
        const { history } = this.props;
        history.push('/search');
      });
  }

  render() {
    const {
      isSaveButtonDisabled,
      loading,
    } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="login-name-input">
              <input
                onChange={ this.handleInput }
                data-testid="login-name-input"
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.onClickButton }
            >
              {' '}
              Entrar
              {' '}

            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  isSaveButtonDisabled: PropTypes.bool,
}.isRequired;

export default Login;
