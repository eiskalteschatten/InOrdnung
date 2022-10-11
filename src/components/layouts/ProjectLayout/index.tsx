import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { IpcRendererEvent } from 'electron';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSaved } from '../../../store/entities/file';

import { getProjectForSaving } from '../../../shared/lib/project';
import Titlebar from './components/Titlebar';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import GlobalInfo from '../../elements/GlobalInfo';
import GlobalError from '../../elements/GlobalError';
import GlobalLoader from '../../elements/GlobalLoader';

import styles from './styles.module.scss';

interface Props {
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

const ProjectLayout: React.FC<Props> = ({ toolbar, children }) => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector(state => state.app.platform);
  const { project, ui, file } = useAppSelector(state => state);
  const { t } = useTranslation(['common']);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();
  const [justOpenedTimeout, setJustOpenedTimeout] = useState<NodeJS.Timeout>();
  const [justOpened, setJustOpened] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.api.on('navigateTo', (e: IpcRendererEvent, url: string) => {
      navigate(url);
    });
  }, []);

  useEffect(() => {
    document.title = project.info.name || t('common:untitled');
  }, [project]);

  useEffect(() => {
    if (file.fileLoaded && !justOpened) {
      if (file.saved) {
        dispatch(setSaved(false));
        window.api.send('projectIsEdited');
      }

      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }

      setAutoSaveTimeout(setTimeout(() => {
        window.api.send('saveProject', getProjectForSaving(), file);
      }, 1000));
    }
    else if (!justOpened && file.saved) {
      dispatch(setSaved(false));
      window.api.send('projectIsEdited');
    }
    else {
      if (justOpenedTimeout) {
        clearTimeout(justOpenedTimeout);
      }

      setJustOpenedTimeout(setTimeout(() => {
        setJustOpened(false);
      }, 1000));
    }
  }, [project, ui]);

  return (
    <div
      className={clsx(styles.projectLayout, {
        [styles.customTitlebar]: platform === 'darwin',
      })}
    >
      {platform === 'darwin' && (<Titlebar />)}

      {toolbar && (
        <Toolbar>
          {toolbar}
        </Toolbar>
      )}

      <div className={styles.content}>
        <Sidebar />

        {children}
      </div>

      <GlobalInfo />
      <GlobalError />
      <GlobalLoader />
    </div>
  );
};

export default ProjectLayout;
