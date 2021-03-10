import { dialog, shell } from 'electron';
import axios from 'axios';

import config from '../../config';
import { getTranslation } from './helper';

interface GithubUpdateResponse {
  html_url: string;
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
}

export default async (showNoUpdatesDialog = false): Promise<void> => {
  const translation = getTranslation();

  const response = await axios.get<GithubUpdateResponse[]>(config.updates.url);

  if (response.status === 200) {
    const latestVersion = response.data[0];
    const checkForPrelease = config.app.version.includes('beta');

    if (latestVersion.tag_name !== config.app.version && !latestVersion.draft && (!latestVersion.prerelease || checkForPrelease)) {
      const result = await dialog.showMessageBox({
        type: 'info',
        buttons: [translation.download, translation.later],
        title: translation.updateAvailable,
        message: translation.wouldYouLikeToDownloadIt,
        detail: translation.newVersionRestart,
      });

      if (result.response === 0) {
        shell.openExternal(latestVersion.html_url);
      }
    }
    else if (showNoUpdatesDialog) {
      dialog.showMessageBox({
        message: translation.noUpdatesAvailable,
        buttons: ['OK'],
        type: 'info',
        defaultId: 0,
        cancelId: 0,
      });
    }
  }
};
