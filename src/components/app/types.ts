import {QuestionArtist, QuestionGenre} from "../../types";

export interface IAppProps {
  authorizationStatus: string;
  login: () => void;
  maxMistakes: number;
  mistakes: number;
  questions: Question[];
  onUserAnswer: () => void;
  onWelcomeButtonClick: () => void;
  resetGame: () => void;
  step: number;
}

export type Question = QuestionArtist | QuestionGenre;
