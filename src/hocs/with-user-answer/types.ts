import {QuestionGenre} from '../../types';

export interface IWithUserAnswerProps {
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: Answer) => void;
}

export interface IWithUserAnswerState {
  answers: Answer;
}

export interface IWithUserAnswerInjectedProps {
  userAnswer: Answer;
  onChange: (answerIndex: number) => void;
  onAnswer: () => void;
}

type Answer = boolean[];
