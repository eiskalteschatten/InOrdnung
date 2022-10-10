import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSaved } from '../../../store/entities/file';

import Titlebar from './components/Titlebar';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import GlobalInfo from '../../elements/GlobalInfo';
import GlobalError from '../../elements/GlobalError';

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

  useEffect(() => {
    document.title = project.info.name || t('common:untitled');
  }, [project]);

  useEffect(() => {
    if (file.fileLoaded && !justOpened) {
      dispatch(setSaved(false));
      window.api.send('projectIsEdited');

      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }

      setAutoSaveTimeout(setTimeout(() => {
        window.api.send('saveProject', { project, ui: ui.preferences }, file);
      }, 1000));
    }
    else if (!justOpened) {
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
    </div>
  );
};

export default ProjectLayout;
