import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Mistakes from '../mistakes/mistakes';

import {getMistakes} from '../../reducer/game/selectors';
import {ActionCreator} from '../../reducer/game/game';

import {AppRoute} from '../../common/consts';
import {IGameScreenProps} from './types';

const timerStyle = {
  filter: `url(#blur)`,
  transform: `rotate(-90deg) scaleY(-1)`,
  transformOrigin: `center`
};

const GameScreen: React.FunctionComponent<IGameScreenProps> = (props: IGameScreenProps) => {
  const {type, children, goToWelcome, mistakes} = props;

  const gameType = `game game--${type}`;

  return (
    <section className={gameType}>
      <header className="game__header">
        <Link
          className="game__back"
          to={AppRoute.ROOT}
          onClick={goToWelcome}
        >
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={timerStyle}/>
        </svg>
        <div className="game__mistakes">
          <Mistakes
            count={mistakes}
          />
        </div>
      </header>
      {children}
    </section>
  );
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  goToWelcome() {
    dispatch(ActionCreator.goToWelcome());
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
