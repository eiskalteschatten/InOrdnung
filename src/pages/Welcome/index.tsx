import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { IpcRendererEvent } from 'electron';

import {
  Grid,
} from '@material-ui/core';

import useTranslation from '../../intl/useTranslation';
import { State } from '../../store';
import Titlebar from '../../components/elements/Titlebar';
import RoundedButton from '../../components/elements/RoundedButton';
import { RecentProjectsLocalStorage } from '../../interfaces/project';

import icon from '../../assets/images/icon.svg';
import styles from './Welcome.module.scss';

const { ipcRenderer } = window.require('electron');

const Welcome: React.FC = () => {
  const platform = useSelector((state: State) => state.app.platform);
  const [recentProjects, setRecentProjects] = useState<RecentProjectsLocalStorage[]>([]);
  const welcomeToInOrdung = useTranslation('welcomeToInOrdung');
  const untitled = useTranslation('projectUntitled');

  useEffect(() => {
    ipcRenderer.on('getRecentProjects', (e: IpcRendererEvent, _recentProjects: RecentProjectsLocalStorage[]): void => {
      setRecentProjects(_recentProjects);
    });
  }, []);

  useEffect(() => {
    document.title = welcomeToInOrdung;
  }, [welcomeToInOrdung]);

  const handleNewProjectClick = (): void => {
    ipcRenderer.send('createNewProject');
    window.close();
  };

  const handleOpenRecentProject = (filePath: string): void => {
    ipcRenderer.send('openFile', filePath);
  };

  const handleOpenFileDialog = (): void => {
    ipcRenderer.send('openFileDialog');
  };

  return (
    <div className='h-100'>
      {platform === 'darwin' && (<Titlebar />)}

      <Grid container className={styles.about}>
        <Grid item xs={7}>
          <div className={styles.iconSection}>
            <img src={icon} alt='InOrdnung' className={styles.icon} />

            <div className={styles.welcome}>
              <FormattedMessage id='welcomeToInOrdung' />
            </div>
          </div>

          <div className={styles.buttons}>
            <RoundedButton onClick={handleNewProjectClick} className={styles.newButton}>
              <i className='bi bi-file-earmark-plus' />&nbsp;<FormattedMessage id='createANewProject' />
            </RoundedButton>

            <RoundedButton onClick={handleOpenFileDialog}>
              <i className='bi bi-folder2-open' />&nbsp;<FormattedMessage id='openAProject' />
            </RoundedButton>
          </div>
        </Grid>
        <Grid item xs={5} className={clsx({
          [styles.recentProjects]: true,
          'hasDarwinTitlebar': platform === 'darwin',
        })}>
          {recentProjects.map((project: RecentProjectsLocalStorage, index: number) => (
            <RoundedButton
              key={index}
              onClick={() => handleOpenRecentProject(project.path)}
              className={styles.recentProject}
            >
              {project.thumbnail ? (
                <img src={`data:${project.thumbnailMimeType};base64,${project.thumbnail}`} className={styles.projectImage} />
              ) : (
                <div className={styles.defaultImage}>
                  <i className={clsx('bi', 'bi-file-earmark-fill', styles.bi)} />
                </div>
              )}

              <div className={styles.projectInfo}>
                <div className={styles.projectName}>{project.name || untitled}</div>
                <div className={styles.projectPath}>{project.path}</div>
              </div>
            </RoundedButton>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Welcome;
