export interface IAuthScreenProps {
  onSubmit: ({login, password}: {login: string; password: string}) => void;
  onReplayButtonClick: () => void;
}
