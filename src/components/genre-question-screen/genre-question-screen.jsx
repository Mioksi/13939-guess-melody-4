import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player.jsx';
import {GameType} from '../../common/consts';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };
  }

  _getTrack(answer, i, userAnswers) {
    const key = `${i}-${answer.src}`;
    const id = `answer-${i}`;

    return (
      <div key={key} className="track">
        <AudioPlayer
          isPlaying={i === 0}
          src={answer.src}
        />
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={id}
            id={id}
            checked={userAnswers[i]}
            onChange={this._handleAnswerChange(userAnswers, i)}
          />
          <label className="game__check" htmlFor={id}>Отметить</label>
        </div>
      </div>
    );
  }

  _renderTracks(answers, userAnswers) {
    return answers.map((answer, i) => this._getTrack(answer, i, userAnswers));
  }

  _handleAnswerChange(userAnswers, i) {
    return (evt) => {
      const value = evt.target.checked;

      this.setState({
        answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
      });
    };
  }

  _handleSubmit(onAnswer, question) {
    return (evt) => {
      evt.preventDefault();

      onAnswer(question, this.state.answers);
    };
  }

  render() {
    const {onAnswer, question} = this.props;
    const {answers: userAnswers} = this.state;
    const {
      answers,
      genre,
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleSubmit(onAnswer, question)}
        >
          {this._renderTracks(answers, userAnswers)}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};


export default GenreQuestionScreen;
