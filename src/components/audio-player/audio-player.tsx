import * as React from "react";

import {IAudioPlayerProps} from './types';

class AudioPlayer extends React.PureComponent<IAudioPlayerProps> {
  render() {
    const {isLoading, isPlaying, onPlayButtonClick, children} = this.props;
    const trackButton = `track__button track__button--${isPlaying ? `pause` : `play`}`;

    return (
      <>
        <button
          className={trackButton}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          {children}
        </div>
      </>
    );
  }
}

export default AudioPlayer;
