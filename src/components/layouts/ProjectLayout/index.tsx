import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { IpcRendererEvent } from 'electron';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSaved } from '../../../store/entities/file';

import getFileRendererInstance from '../../../shared/lib/projectFiles';
import Titlebar from './components/Titlebar';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import WelcomeDialog from './components/WelcomeDialog';
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
    const navigateToEventHandlerElectron = (e: IpcRendererEvent, url: string) => navigate(url);
    const navigateToEventHandler = (e: CustomEvent) => navigate(e.detail);

    window.api.on('navigateTo', navigateToEventHandlerElectron);
    window.addEventListener('navigateTo', navigateToEventHandler as EventListener);

    return () => {
      window.api.removeListener('navigateTo', navigateToEventHandlerElectron);
      window.removeEventListener('navigateTo', navigateToEventHandler as EventListener);
    };
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

      setAutoSaveTimeout(setTimeout(async () => {
        const fileClass = await getFileRendererInstance();
        window.api.send('saveProject', fileClass.serializeProjectForSaving(), file);
      }, 1000));
    }
    else if (!justOpened && (!file.fileLoaded || file.saved)) {
      dispatch(setSaved(false));
      window.api.send('projectIsEdited');
    }
    else if (justOpened) {
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
        [styles.customTitlebar]: platform === 'darwin' || platform === 'win32',
      })}
    >
      <Titlebar>
        {toolbar && (
          <Toolbar>
            {toolbar}
          </Toolbar>
        )}
      </Titlebar>

      <div className={styles.content}>
        <Sidebar />

        {children}
      </div>

      <WelcomeDialog />

      <GlobalInfo />
      <GlobalError />
      <GlobalLoader />
    </div>
  );
};

export default ProjectLayout;
