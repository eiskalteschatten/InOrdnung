import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { IpcRendererEvent } from 'electron';

import {
  Grid,
} from '@material-ui/core';

import NoteAdd from '@material-ui/icons/NoteAdd';
import FolderOpen from '@material-ui/icons/FolderOpen';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

import useTranslation from '../../intl/useTranslation';
import { State } from '../../store';
import Titlebar from '../../components/Titlebar';
import RoundedButton from '../../components/RoundedButton';
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

    return () => {
      ipcRenderer.removeAllListeners('getRecentProjects');
    };
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
    <div className={styles.welcome}>
      {platform === 'darwin' && (<Titlebar />)}

      <Grid container className={styles.welcome}>
        <Grid item xs={7}>
          <div className={clsx({
            [styles.iconSection]: true,
            'hasDarwinTitlebar': platform === 'darwin',
          })}>
            <img src={icon} alt='InOrdnung' className={styles.icon} />

            <div className={styles.welcome}>
              <FormattedMessage id='welcomeToInOrdung' />
            </div>
          </div>

          <div className={styles.buttons}>
            <RoundedButton onClick={handleNewProjectClick} className={styles.newButton}>
              <NoteAdd fontSize='small' />&nbsp;<FormattedMessage id='createANewProject' />
            </RoundedButton>

            <RoundedButton onClick={handleOpenFileDialog}>
              <FolderOpen fontSize='small' />&nbsp;<FormattedMessage id='openAProject' />
            </RoundedButton>
          </div>
        </Grid>
        <Grid item xs={5} className={clsx({
          [styles.recentProjects]: true,
          'hasDarwinTitlebar': platform === 'darwin',
        })}>
          {recentProjects?.map((project: RecentProjectsLocalStorage, index: number) => (
            <RoundedButton
              key={index}
              onClick={() => handleOpenRecentProject(project.path)}
              className={styles.recentProject}
            >
              {project.thumbnail ? (
                <img src={`data:${project.thumbnailMimeType};base64,${project.thumbnail}`} className={styles.projectImage} />
              ) : (
                <div className={styles.defaultImage}>
                  <InsertDriveFile />
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
