import * as React from 'react';

import {AnswerGenre} from '../../types';

export interface IGenreQuestionItemProps {
  answer: AnswerGenre;
  id: number;
  onChange: (id: number, value: boolean) => void;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  userAnswer: boolean;
}
