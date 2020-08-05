import * as React from 'react';
import {IGenreQuestionItemProps} from './types';

class GenreQuestionItem extends React.PureComponent<IGenreQuestionItemProps> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const {id, onChange} = this.props;
    const value = evt.target.checked;

    onChange(id, value);
  }

  render() {
    const {answer, id, renderPlayer, userAnswer} = this.props;
    const answerId = `answer-${id}`;

    return (
      <div className="track">
        {renderPlayer(answer.src, id)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={answerId}
            id={answerId}
            checked={userAnswer}
            onChange={this.handleChange}
          />
          <label className="game__check" htmlFor={answerId}>Отметить</label>
        </div>
      </div>
    );
  }
}

export default GenreQuestionItem;
