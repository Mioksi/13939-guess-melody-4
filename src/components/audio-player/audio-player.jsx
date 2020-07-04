import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

export default class AudioPlayer extends PureComponent {
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

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
