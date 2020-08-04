import * as React from "react";

import {IWithAudioProps, IWithAudioState} from './types';

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent<IWithAudioProps, IWithAudioState> {
    private readonly audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this.audioRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this.audioRef.current;

      if (audio) {
        audio.src = src;

        audio.oncanplaythrough = () => this._handleCanPlayThrough();
        audio.onplay = () => this._handlePlay();
        audio.onpause = () => this._handlePause();
        audio.ontimeupdate = () => this._handleTimeUpdale();
      }
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;

      if (audio) {
        if (this.state.isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }

    componentWillUnmount() {
      const audio = this.audioRef.current;

      if (audio) {
        audio.oncanplaythrough = null;
        audio.onplay = null;
        audio.onpause = null;
        audio.ontimeupdate = null;
        audio.src = ``;
      }
    }

    _handleCanPlayThrough() {
      this.setState({
        isLoading: false,
      });
    }

    _handlePlay() {
      this.setState({
        isPlaying: true,
      });
    }

    _handlePause() {
      this.setState({
        isPlaying: false,
      });
    }

    _handleTimeUpdale() {
      const audio = this.audioRef.current;

      this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    _handlePlayButtonClick() {
      const {onPlayButtonClick} = this.props;

      this.setState({isPlaying: !this.state.isPlaying});

      onPlayButtonClick();
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayButtonClick={this._handlePlayButtonClick}
        >
          <audio
            ref={this.audioRef}
          />
        </Component>
      );
    }
  }

  return WithAudio;
};

export default withAudio;
