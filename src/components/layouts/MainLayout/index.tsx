import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store/hooks';

import Titlebar from './components/Titlebar';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';

import styles from './styles.module.scss';

interface Props {
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ toolbar, children }) => {
  const platform = useAppSelector(state => state.app.platform);
  const projectName = useAppSelector(state => state.project.info.name);
  const { t } = useTranslation(['common']);

  useEffect(() => {
    document.title = projectName || t('common:untitled');
  }, [projectName]);

  return (
    <div
      className={clsx(styles.mainLayout, {
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
    </div>
  );
};

export default MainLayout;
