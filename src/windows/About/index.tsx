import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { IpcRendererEvent } from 'electron';

import {
  Grid,
} from '@material-ui/core';

import useTranslation from '../../intl/useTranslation';
import { handleLinkClick } from '../../lib/links';

import icon from '../../assets/images/icon.svg';
import styles from './About.module.scss';

const { remote, ipcRenderer } = window.require('electron');

interface ProcessVersions {
  node: string;
  chrome: string;
  electron: string;
}

const About: React.FC = () => {
  const [processVersions, setProcessVersions] = useState<ProcessVersions>();
  const aboutInOrdnung = useTranslation('aboutInOrdnung');
  const asCom = 'https://www.alexseifert.com';

  useEffect(() => {
    document.title = aboutInOrdnung;
    ipcRenderer.on('processVersions', (event: IpcRendererEvent, versions: ProcessVersions): void => setProcessVersions(versions));

    return () => {
      ipcRenderer.removeAllListeners('processVersions');
    };
  }, [aboutInOrdnung]);

  return (
    <Grid container className={styles.about} spacing={5}>
      <Grid item xs={6}>
        <img src={icon} alt='InOrdnung' className={styles.appIcon} />
      </Grid>
      <Grid item xs={6}>
        <div className={styles.title}>InOrdnung</div>

        <div>
          <FormattedMessage id='by' /> <a href={asCom} onClick={e => handleLinkClick(e, asCom)} className={styles.ascomLink}>Alex Seifert</a>
        </div>

        <div className={styles.version}>
          {remote.app.getVersion()}
        </div>

        <div className={styles.electronVersions}>
          <div><b>Node Version:</b> {processVersions?.node}</div>
          <div><b>Chromium Version:</b> {processVersions?.chrome}</div>
          <div><b>Electron Version:</b> {processVersions?.electron}</div>
        </div>

        <div className={styles.legal}>
          Copyright © Alex Seifert 2021.
        </div>
      </Grid>
    </Grid>
  );
};

export default About;
