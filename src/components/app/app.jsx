import React, {PureComponent} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import PropTypes from 'prop-types';

import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import {GameType, START_STEP} from '../../common/consts';

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: START_STEP,
    };

    this._handleWelcomeButtonClick = this._handleWelcomeButtonClick.bind(this);
    this._handleScreenChange = this._handleScreenChange.bind(this);
  }

  _handleWelcomeButtonClick() {
    this.setState({
      step: 0,
    });
  }

  _handleScreenChange() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  _renderGameScreen() {
    const {
      mistakes,
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
      resetGame,
    } = this.props;
    const question = questions[step];

    if (step === START_STEP || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    if (mistakes >= 2) {
      return (
        <WelcomeScreen
          onWelcomeButtonClick={resetGame}
          errorsCount={maxMistakes}
        />
      );
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <ArtistQuestionScreenWrapped
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreenWrapped
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  mistakes: state.mistakes,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
