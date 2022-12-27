import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductsCard extends React.Component {
  render() {
    const {
      title,
      thumbnail,
      price,
      id,
    } = this.props;

    return (
      <div data-testid="product">
        <h3>{ title }</h3>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <Link to={ `/product-details/${id}` } data-testid="product-detail-link">
          Ver detalhes do Produto
        </Link>
      </div>
    );
  }
}

ProductsCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  product: PropTypes.object,
}.isRequired;

export default ProductsCard;
