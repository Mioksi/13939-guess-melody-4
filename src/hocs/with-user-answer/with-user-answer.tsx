import * as React from 'react';
import {Subtract} from "utility-types";

import {IWithUserAnswerInjectedProps, IWithUserAnswerProps, IWithUserAnswerState} from './types';

const withUserAnswer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = IWithUserAnswerProps & Subtract<P, IWithUserAnswerInjectedProps>;

  class WithUserAnswer extends React.PureComponent<T, IWithUserAnswerState> {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleAnswer() {
      const {onAnswer, question} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
    }

    handleChange(i, value) {
      const {answers} = this.state;

      const userAnswers = answers.slice(0);
      userAnswers[i] = value;

      this.setState({
        answers: userAnswers,
      });
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={answers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }
  }

  return WithUserAnswer;
};


export default withUserAnswer;
