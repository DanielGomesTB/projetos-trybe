import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
 state = {
   loading: false,
   isChecked: false,
 }

 componentDidMount() {
   this.favoriteMusic();
 }

 favoriteMusic = () => {
   const { favorites, trackId } = this.props;
   const isFavorite = favorites.some((music) => music.trackId === trackId);
   this.setState({
     isChecked: isFavorite,
   });
 }

 handleChange = (event) => {
   const { checked, name } = event.target;
   this.setState({
     loading: true,
     [name]: checked,
   }, async () => {
     const { music } = this.props;
     const { isChecked } = this.state;
     if (isChecked) {
       await addSong(music);
     } else {
       await removeSong(music);
     }
     this.setState({
       loading: false,
     });
   });
 }

 render() {
   const { previewUrl, trackName, trackId } = this.props;
   const { loading, isChecked } = this.state;

   return (
     <div>
       <h3>{trackName}</h3>
       <audio data-testid="audio-component" src={ previewUrl } controls>
         <track kind="captions" />
         O seu navegador não suporta o elemento
         {' '}
         {' '}
         <code>audio</code>
         .
       </audio>
       <label htmlFor="favoriteInput">
         Favorita
         <input
           data-testid={ `checkbox-music-${trackId}` }
           name="isChecked"
           type="checkbox"
           id="favoriteInput"
           onChange={ this.handleChange }
           checked={ isChecked }
         />
       </label>
       {loading && <Loading /> }
     </div>
   );
 }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  music: PropTypes.object,
  favorite: PropTypes.arrayOf(PropTypes.number),
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
