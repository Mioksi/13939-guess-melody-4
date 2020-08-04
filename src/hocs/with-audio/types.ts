export interface IWithAudioProps {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  src: string;
}

export interface IWithAudioState {
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
}
