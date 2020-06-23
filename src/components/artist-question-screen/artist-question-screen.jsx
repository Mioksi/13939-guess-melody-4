import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player.jsx';
import {GameType} from '../../common/consts';

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true,
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
  }

  _getArtist(answer, i, onAnswer, question) {
    const id = `answer-${i}`;

    return (
      <div key={answer.artist} className="artist">
        <input className="artist__input visually-hidden" type="radio" name="answer" value={id}
          id={id}
          onChange={this._handleAnswerChange(answer, onAnswer, question)}
        />
        <label className="artist__name" htmlFor={id}>
          <img className="artist__picture" src={answer.picture} alt={answer.artist}/>
          {answer.artist}
        </label>
      </div>
    );
  }

  _renderArtists(answers, onAnswer, question) {
    return answers.map((answer, i) => this._getArtist(answer, i, onAnswer, question));
  }

  _handleAnswerChange(answer, onAnswer, question) {
    return (evt) => {
      evt.preventDefault();
      onAnswer(question, answer);
    };
  }

  _handlePlayButtonClick() {
    const {isPlaying} = this.state;

    this.setState({isPlaying: !isPlaying});
  }

  render() {
    const {isPlaying} = this.state;
    const {onAnswer, question} = this.props;
    const {
      answers,
      song,
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <AudioPlayer
              isPlaying={isPlaying}
              src={song.src}
              onPlayButtonClick={this._handlePlayButtonClick}
            />
          </div>
        </div>
        <form className="game__artist">
          {this._renderArtists(answers, onAnswer, question)}
        </form>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};

export default ArtistQuestionScreen;
