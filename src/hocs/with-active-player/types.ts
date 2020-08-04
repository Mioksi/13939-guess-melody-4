import * as React from 'react';

export interface IWithActivePlayerState {
  activePlayerId: number;
}

export interface IWithActivePlayerInjectingProps {
  renderPlayer: (src: string, id: number) => React.ReactNode;
}
