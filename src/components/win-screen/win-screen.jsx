import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {AppRoute} from '../../common/consts';

const WinScreen = ({questionsCount, mistakesCount, onReplayButtonClick}) => {
  const correctlyQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <Link
        className="replay"
        to={AppRoute.ROOT}
        type="button"
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </Link>
    </section>
  );
};

WinScreen.propTypes = {
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default WinScreen;
