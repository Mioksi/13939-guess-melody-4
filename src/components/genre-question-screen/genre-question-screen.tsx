import * as React from 'react';

import GenreQuestionItem from '../genre-question-item/genre-question-item';

import {IGenreQuestionScreenProps} from './types';

class GenreQuestionScreen extends React.PureComponent<IGenreQuestionScreenProps> {
  constructor(props) {
    super(props);

    this._getTrack = this._getTrack.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getTrack(answer, i) {
    const {renderPlayer, userAnswers, onChange} = this.props;
    const key = `${i}-${answer.src}`;

    return (
      <GenreQuestionItem
        answer={answer}
        id={i}
        key={key}
        onChange={onChange}
        renderPlayer={renderPlayer}
        userAnswer={userAnswers[i]}
      />
    );
  }

  _renderTracks(answers) {
    return answers.map(this._getTrack);
  }

  _handleSubmit(evt) {
    const {onAnswer} = this.props;

    evt.preventDefault();
    onAnswer();
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

export default GenreQuestionScreen;
