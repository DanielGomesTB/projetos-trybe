import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  // constructor() {
  //   super();

  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  //     this.state = {
  //       cardName: '',
  //       cardDescription: '',
  //       cardAttr1: '',
  //       cardAttr2: '',
  //       cardAttr3: '',
  //       cardImage: '',
  //       cardRare: '',
  //       cardTrunfo: false,
  //       hasTrunfo: false,
  //       isSaveButtonDisabled: true,
  //     };

  //   onSaveButtonClick({ target }) {
  //     target.disabled = false;
  //   }

  //   onInputChange({ target }) {
  //     console.log(target);
  //     const { name } = target;
  //     const value = target.type === 'checkbox' ? target.checked : target.value;
  //     this.setState({ [name]: value });
  //   }

  //   const {
  //     cardName,
  //     cardDescription,
  //     cardAttr1,
  //     cardAttr2,
  //     cardAttr3,
  //     cardImage,
  //     cardRare,
  //     cardTrunfo,
  //     hasTrunfo,
  //     isSaveButtonDisabled,
  //     onInputChange,
  //     onSaveButtonClick,
  //  } = this.props;

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="name-input">
            Nome Da Carta
            <input
              name="cardName"
              onChange={ onInputChange }
              value={ cardName }
              type="text"
              data-testid="name-input"
            />
          </label>
          <label htmlFor="description-input">
            Descrição Da Carta
            <textarea
              name="cardDescription"
              onChange={ onInputChange }
              value={ cardDescription }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="attr1-input">
            Primeiro Atributo Da Carta
            <input
              name="cardAttr1"
              onChange={ onInputChange }
              value={ cardAttr1 }
              type="number"
              data-testid="attr1-input"
            />
          </label>
          <label htmlFor="attr2-input">
            Segundo Atributo Da Carta
            <input
              name="cardAttr2"
              onChange={ onInputChange }
              value={ cardAttr2 }
              type="number"
              data-testid="attr2-input"
            />
          </label>
          <label htmlFor="attr3-input">
            Terceiro Atributo Da Carta
            <input
              name="cardAttr3"
              onChange={ onInputChange }
              value={ cardAttr3 }
              type="number"
              data-testid="attr3-input"
            />
          </label>
          <label htmlFor="image-input">
            Caminho Para Imagem da Carta
            <input
              name="cardImage"
              onChange={ onInputChange }
              value={ cardImage }
              type="text"
              data-testid="image-input"
            />
          </label>
          <label htmlFor="rare-input">
            Inserir Raridade da Carta
            <select
              name="cardRare"
              data-testid="rare-input"
              onChange={ onInputChange }
              value={ cardRare }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          {hasTrunfo === true ? <p>Você já tem um Super Trunfo em seu baralho</p> : (
            <label htmlFor="trunfo-input">
              Carta é Super Trunfo?
              <input
                name="cardTrunfo"
                onChange={ onInputChange }
                checked={ cardTrunfo }
                type="checkbox"
                data-testid="trunfo-input"
              />
            </label>)}
          <button
            type="submit"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            data-testid="save-button"
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
}.isRequired;

export default Form;
