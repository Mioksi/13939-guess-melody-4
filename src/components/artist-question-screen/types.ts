import * as React from 'react';

import {AnswerArtist, QuestionArtist} from '../../types';

export interface IArtistQuestionScreenProps {
  onAnswer: (question: QuestionArtist, answer: AnswerArtist) => void;
  question: QuestionArtist;
  renderPlayer: (string, number) => React.ReactNode;
}
