import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { IpcRendererEvent } from 'electron';

import {
  Grid,
} from '@material-ui/core';

import useTranslation from '../../intl/useTranslation';

import icon from '../../assets/images/icon.svg';
import styles from './About.module.scss';

const { remote, shell, ipcRenderer } = window.require('electron');

interface ProcessVersions {
  node: string;
  chrome: string;
  electron: string;
}

const About: React.FC = () => {
  const [processVersions, setProcessVersions] = useState<ProcessVersions>();
  const aboutInOrdnung = useTranslation('aboutInOrdnung');

  useEffect(() => {
    document.title = aboutInOrdnung;
    ipcRenderer.on('processVersions', (event: IpcRendererEvent, versions: ProcessVersions): void => setProcessVersions(versions));
  }, [aboutInOrdnung]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;
    const href = target.getAttribute('href');

    if (href) {
      shell.openExternal(href);
    }
  };

  return (
    <Grid container className={styles.about}>
      <Grid item>
        <img src={icon} alt='InOrdnung' />
      </Grid>
      <Grid item>
        <div className={styles.title}>InOrdnung</div>

        <div><FormattedMessage id='by' /> <a href='https://www.alexseifert.com' onClick={handleLinkClick}>Alex Seifert</a></div>

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
