import * as React from 'react';

import {IArtistQuestionScreenProps} from './types';

const ArtistQuestionScreen: React.FunctionComponent<IArtistQuestionScreenProps> = (props: IArtistQuestionScreenProps) => {
  const {onAnswer, question, renderPlayer} = props;
  const {answers, song,} = question;

  const handleAnswerChange = (answer) => {
    return (evt) => {
      evt.preventDefault();
      onAnswer(question, answer);
    };
  };

  const getArtist = (answer, i) => {
    const id = `answer-${i}`;

    return (
      <div key={answer.artist} className="artist">
        <input className="artist__input visually-hidden" type="radio" name="answer" value={id}
          id={id}
          onChange={handleAnswerChange(answer)}
        />
        <label className="artist__name" htmlFor={id}>
          <img className="artist__picture" src={answer.picture} alt={answer.artist}/>
          {answer.artist}
        </label>
      </div>
    );
  };

  const renderArtists = () => answers.map(getArtist);

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 0)}
        </div>
      </div>
      <form className="game__artist">
        {renderArtists()}
      </form>
    </section>
  );
};

export default ArtistQuestionScreen;
