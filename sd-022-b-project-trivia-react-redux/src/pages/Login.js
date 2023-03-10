import React from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer } from '../redux/actions';
import { saveStorage } from '../services/localStorage';
import { requestTokenAPI } from '../services/requestAPI';
import '../App.css';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isSaveButtonDisabled: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.buttonChange());
  };

  buttonChange = () => {
    const { email, name } = this.state;
    const minValue = 3;
    const emailValidation = /\S+@\S+\.\S+/;
    const validation = emailValidation.test(email) && name.length >= minValue;
    // regex retirado de: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    this.setState({ isSaveButtonDisabled: !validation });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const { addPlayerDispatch, history } = this.props;
    addPlayerDispatch({ name, email });
    const token = await requestTokenAPI();
    saveStorage('token', token);
    history.push('/game');
  };

  render() {
    const { isSaveButtonDisabled } = this.state;
    const { history } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Tr
            <span>iui</span>
            a
          </h1>
          <p>SUA VEZ</p>
          <form className="formLogin">
            <label htmlFor="input-email">
              Email
              <input
                name="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                id="input-email"
              />
            </label>
            <label htmlFor="input-name">
              Name
              <input
                name="name"
                id="input-name"
                onChange={ this.handleChange }
                data-testid="input-player-name"
                maxLength="17"
              />
            </label>
            <div className="button-container">
              <button
                data-testid="btn-play"
                onClick={ this.handleClick }
                type="submit"
                disabled={ isSaveButtonDisabled }
              >
                {' '}
                Play
                {' '}
              </button>
              <button
                type="button"
                data-testid="btn-settings"
                onClick={ () => history.push('/settings') }
              >
                Settings
              </button>
            </div>
          </form>
        </header>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayerDispatch: (state) => dispatch(addPlayer(state)),
});

Login.propTypes = {
  addPlayerDispatch: func.isRequired,
  history: shape({ push: func }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
