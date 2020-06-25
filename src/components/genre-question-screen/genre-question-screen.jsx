import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {GameType} from '../../common/consts';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: 0,
      answers: [false, false, false, false],
    };

    this._getTrack = this._getTrack.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getTrack(answer, i) {
    const {renderPlayer} = this.props;
    const {answers: userAnswers} = this.state;
    const key = `${i}-${answer.src}`;
    const id = `answer-${i}`;

    return (
      <div key={key} className="track">
        {renderPlayer(answer.src, i)}
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

  _renderTracks(answers) {
    return answers.map(this._getTrack);
  }

  _handleAnswerChange(userAnswers, i) {
    return (evt) => {
      const value = evt.target.checked;

      this.setState({
        answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
      });
    };
  }

  _handleSubmit(evt) {
    const {onAnswer, question} = this.props;

    evt.preventDefault();
    onAnswer(question, this.state.answers);
  }

  render() {
    const {question} = this.props;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleSubmit}
        >
          {this._renderTracks(answers)}
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
  renderPlayer: PropTypes.func.isRequired,
};


export default GenreQuestionScreen;
