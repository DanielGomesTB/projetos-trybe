import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
    } = this.props;
    return (
      <div>
        <h3 data-testid="name-card">
          {cardName}
        </h3>
        <img
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
        />
        <p data-testid="description-card">
          {cardDescription}
        </p>
        <h4 data-testid="attr1-card">
          {cardAttr1}
        </h4>
        <h4 data-testid="attr2-card">
          {cardAttr2}
        </h4>
        <h4 data-testid="attr3-card">
          {cardAttr3}
        </h4>
        <h4 data-testid="rare-card">
          {cardRare}
        </h4>
        {cardTrunfo ? <p data-testid="trunfo-card"> Super Trunfo </p> : ''}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;

export default Card;
