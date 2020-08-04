import * as React from 'react';
import {GameType} from '../../types';

export interface IGameScreenProps {
  type: GameType;
  children: React.ReactNode;
  goToWelcome: () => void;
  mistakes: number;
}
