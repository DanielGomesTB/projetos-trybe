import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      cards: [],
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.setState({ isSaveButtonDisabled: this.verification() }));
  }

  onClickSubmit(event) {
    event.preventDefault();
    const value = this.state;
    this.setState((prevState) => ({
      cards: [...prevState.cards, value],
    }));
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardTrunfo: false,
      cardRare: 'normal',
      isSaveButtonDisabled: true,
    }, this.setState({ hasTrunfo: this.handleTrunfo(value) }));
  }

  removeCard = (name) => {
    this.setState((prevCard) => ({
      cards: prevCard.cards.filter((element) => element.cardName !== name) }), () => {
      const value = this.state;
      this.setState({ hasTrunfo: this.handleTrunfo(value) });
    });
  }

  handleTrunfo = (value) => {
    if (value.cardTrunfo === true) return true;
    return false;
  }

  numberVerification() {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const maxValue = 90;
    const sum = 210;
    if (Number(cardAttr1) <= maxValue && Number(cardAttr1) >= 0
    && Number(cardAttr2) <= maxValue && Number(cardAttr2) >= 0
    && Number(cardAttr3) <= maxValue && Number(cardAttr3) >= 0
    && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= sum
    ) { return true; }
    return false;
  }

  verification() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
    } = this.state;

    if (this.numberVerification()
    && cardName
    && cardDescription
    && cardImage
    && cardRare) {
      return false;
    }
    return true;
  }

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
      // onInputChange,
      // onSaveButtonClick,
      cards,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          onInputChange={ this.onInputChange }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onClickSubmit }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          {cards.map((card, index) => (
            <div key={ index }>
              <Card { ...card } />
              <button
                data-testid="delete-button"
                type="button"
                onClick={ () => this.removeCard(card.cardName) }
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
//
export default App;
