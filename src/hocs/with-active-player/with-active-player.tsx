import * as React from 'react';
import {Subtract} from 'utility-types';

import Player from '../../components/audio-player/audio-player';
import withAudio from '../with-audio/with-audio';

import {IWithActivePlayerInjectingProps, IWithActivePlayerState} from './types';

const AudioPlayer = withAudio(Player);

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type T = Subtract<P, IWithActivePlayerInjectingProps>;

  class WithActivePlayer extends React.PureComponent<T, IWithActivePlayerState> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    _getAudioPlayer(src, id) {
      const {activePlayerId} = this.state;

      return (
        <AudioPlayer
          src={src}
          isPlaying={id === activePlayerId}
          onPlayButtonClick={this._handlePlayButtonClick(id)}
        />
      );
    }

    _handlePlayButtonClick(id) {
      const {activePlayerId} = this.state;

      return () => {
        this.setState({
          activePlayerId: activePlayerId === id ? -1 : id
        });
      };
    }

    render() {
      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => this._getAudioPlayer(src, id)}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
