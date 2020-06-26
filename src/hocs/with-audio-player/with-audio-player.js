import React, {PureComponent} from 'react';

import AudioPlayer from '../../components/audio-player/audio-player.jsx';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
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
