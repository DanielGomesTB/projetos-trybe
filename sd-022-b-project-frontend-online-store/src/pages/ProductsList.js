import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CategoriesCard from '../components/CategoriesCard';
import ProductsCard from '../components/ProductsCard';

class ProductsList extends React.Component {
    state = {
      inputSearch: '',
      productsList: [],
    }

    callgetProductsFromCategoryAndQuery = async () => {
      const { inputSearch } = this.state;
      const products = await getProductsFromCategoryAndQuery(undefined, inputSearch);
      this.setState({
        productsList: products.results,
      });
    }

    onRadioClick = async (event) => {
      const { value } = event.target;
      const products = await getProductsFromCategoryAndQuery(undefined, value);
      this.setState({
        productsList: products.results,
      });
    }

    handleChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value,
      });
    }

    render() {
      const { inputSearch, productsList } = this.state;

      const { categoriesList, onClick } = this.props;

      return (
        <div>
          <label htmlFor="inputSearch">
            <input
              type="text"
              name="inputSearch"
              id="inputSearch"
              data-testid="query-input"
              value={ inputSearch }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.callgetProductsFromCategoryAndQuery }
          >
            Pesquisar
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
          {inputSearch.length === 0
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)}
          { categoriesList.map((category) => (
            <CategoriesCard
              onClick={ this.onRadioClick }
              key={ category.id }
              name={ category.name }
            />
          )) }
          { productsList.map((product) => (
            <div key={ product.id }>
              <ProductsCard
                title={ product.title }
                thumbnail={ product.thumbnail }
                price={ product.price }
                id={ product.id }
                product={ product }
              />
              <button
                data-testid="product-add-to-cart"
                id={ product.id }
                type="button"
                onClick={ () => onClick(product) }
              >
                Enviar para o carrinho
              </button>
            </div>
          )) }

        </div>
      );
    }
}

ProductsList.propTypes = {
  categoriesList: PropTypes.array,
}.isRequired;

export default ProductsList;
