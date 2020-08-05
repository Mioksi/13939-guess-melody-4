import * as React from 'react';

import {QuestionGenre} from '../../types';

export interface IGenreQuestionScreenProps {
  onAnswer: () => void;
  onChange: () => void;
  question: QuestionGenre;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  userAnswers: boolean[];
}
