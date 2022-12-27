import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      valueInput: '',
      loading: false,
      albums: [],
      artist: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    const minValue = 2;
    if (value.length >= minValue) {
      this.setState({
        isButtonDisabled: false,
        valueInput: value,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
        valueInput: value,
      });
    }
  }

  handleClick() {
    const { valueInput } = this.state;
    this.request();
    this.setState({
      valueInput: '',
      artist: valueInput,
    });
  }

  request = async () => {
    const { valueInput } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(valueInput)
      .then((result) => this.setState({
        albums: result,
        loading: false,
      }));
  }

  render() {
    const {
      isButtonDisabled,
      valueInput,
      loading,
      albums,
      artist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading />
          : (
            <form>
              <label htmlFor="search-artist-input">
                <input
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                  value={ valueInput }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleClick }
              >
                {' '}
                Pesquisar
                {' '}
              </button>
            </form>)}
        <p>{`Resultado de álbuns de: ${artist}`}</p>
        <div>
          { albums.length === 0 ? <p>Nenhum álbum foi encontrado</p>
            : albums.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <div>
                  <p>{album.collectionName}</p>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                </div>
              </Link>
            )) }
        </div>
      </div>
    );
  }
}

export default Search;
