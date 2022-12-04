import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { setOpenWelcomeDialog } from '../../../../../store/entities/ui/session';

import config from '../../../../../config';
import Dialog from '../../../../elements/Dialog';
import DialogContent from '../../../../elements/DialogContent';
import Button from '../../../../elements/Button';
import Spinner from '../../../../elements/Spinner';

import { ReactComponent as Icon } from '../../../../../assets/images/icon.svg';

import styles from './styles.module.scss';

const WelcomeDialog: React.FC = () => {
  const { t } = useTranslation(['common', 'projects']);
  const { recentProjects } = useAppSelector(state => state.app);
  const { fileLoaded } = useAppSelector(state => state.file);
  const { openWelcomeDialog } = useAppSelector(state => state.ui.session);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(setOpenWelcomeDialog(false));

  const handleNewProject = () => fileLoaded
    ? window.api.send('createNewProject')
    : handleClose();

  const handleOpenProject = () => window.api.send('openFileDialog');
  const handleOpenRecentProject = (filePath: string) => window.api.send('openFile', filePath);

  useEffect(() => {
    if (openWelcomeDialog) {
      window.api.send('getRecentProjects');
    }
  }, [openWelcomeDialog]);

  return (
    <Dialog open={openWelcomeDialog} onClose={handleClose}>
      <DialogContent className={styles.welcomeDialog}>
        <div className={styles.iconSide}>
          <Icon className={styles.icon} />
          <div className={styles.appName}>InOrdnung</div>
          <div className={styles.version}>{t('common:version')} {config.app.version}</div>

          <div className={styles.buttons}>
            <Button
              icon={<span className='material-icons'>add</span>}
              onClick={handleNewProject}
              fullWidth
              centerContent
            >
              {t('projects:newProject')}
            </Button>
            <Button
              icon={<span className='material-icons'>folder_open</span>}
              onClick={handleOpenProject}
              fullWidth
              centerContent
            >
              {t('projects:openProject')}
            </Button>
          </div>
        </div>

        <div className={clsx(styles.recentProjects, {
          [styles.noRecentProject]: !Array.isArray(recentProjects) || recentProjects.length === 0,
        })}>
          {Array.isArray(recentProjects) && recentProjects.length > 0 ? (
            <>
              {recentProjects.map((project, index) => (
                <Button
                  key={index}
                  large
                  onClick={() => handleOpenRecentProject(project.path)}
                  contentClassName={styles.recentProjectButton}
                >
                  <div className={styles.name}>{project?.name}</div>
                  <div className={styles.path}>{project?.path}</div>
                </Button>
              ))}
            </>
          ) : (
            <div className={styles.noRecentProjectsFound}>
              {t('projects:noRecentProjectsFound')}
            </div>
          )}

          {!Array.isArray(recentProjects) && (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
