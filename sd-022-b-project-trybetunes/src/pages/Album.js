import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  // constructor() {
  //   super();
    state = {
      artistName: '',
      collectionName: '',
      musics: [],
      favorites: [],
      loading: false,
    };
    // }

    componentDidMount = () => {
      this.request();
      this.requestFavorite();
    }

  request = async () => {
    const album = window.location.pathname.split('/')[2];
    const resolve = await getMusics(album);
    this.setState({
      artistName: resolve[0].artistName,
      collectionName: resolve[0].collectionName,
      musics: resolve.filter((element) => element.kind === 'song'),
    });
  }

  requestFavorite = async () => {
    const resolve = await getFavoriteSongs();
    this.setState({
      favorites: resolve,
      loading: true,
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { artistName, collectionName, musics, favorites, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="artist-name">
            {' '}
            {artistName}
          </h3>
          <h4 data-testid="album-name">
            {collectionName}
          </h4>
        </div>
        { loading ? <Loading /> : (
          musics.map((music, i) => (
            <MusicCard
              music={ music }
              trackId={ music.trackId }
              previewUrl={ music.previewUrl }
              trackName={ music.trackName }
              favorites={ favorites }
              key={ i }
            />
          ))
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.string,
}.isRequired;

export default Album;
