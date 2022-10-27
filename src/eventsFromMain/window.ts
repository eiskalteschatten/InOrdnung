import { getState } from '../store';

window.api.on('closeWindowIfFileNotLoaded', () => {
  const state = getState();

  if (!state.file.fileLoaded && state.file.saved) {
    window.close();
  }
});
