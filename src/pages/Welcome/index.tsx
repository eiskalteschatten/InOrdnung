import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { IpcRendererEvent } from 'electron';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    console.log(filePath);
  };

  return (
    <div className='h-100'>
      {platform === 'darwin' && (<Titlebar />)}

      <Row className='h-100'>
        <Col xs={7}>
          <div className={styles.iconSection}>
            <img src={icon} alt='InOrdnung' className={styles.icon} />

            <div className={styles.welcome}>
              <FormattedMessage id='welcomeToInOrdung' />
            </div>
          </div>

          <div className={styles.buttons}>
            <RoundedButton onClick={handleNewProjectClick}>
              <i className='bi-file-earmark-plus' />&nbsp;<FormattedMessage id='createANewProject' />
            </RoundedButton>
          </div>
        </Col>
        <Col xs={5} className={clsx({
          [styles.recentProjects]: true,
          'hasDarwinTitlebar': platform === 'darwin',
        })}>
          {recentProjects.map((project: RecentProjectsLocalStorage, index: number) => (
            <div className={styles.recentProject}>
              <RoundedButton
                key={index}
                onClick={() => handleOpenRecentProject(project.path)}
              >
                {project.thumbnail ? (
                  <img src={`data:${project.thumbnailMimeType};base64,${project.thumbnail}`} className={styles.projectImage} />
                ) : (
                  <div>default image here</div>
                )}

                <div className={styles.projectInfo}>
                  <div className={styles.projectName}>{project.name || untitled}</div>
                  <div className={styles.projectPath}>{project.path}</div>
                </div>
              </RoundedButton>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
