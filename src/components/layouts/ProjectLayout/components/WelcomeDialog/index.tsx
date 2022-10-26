import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import config from '../../../../../config';
import Dialog from '../../../../elements/Dialog';
import DialogContent from '../../../../elements/DialogContent';
import Button from '../../../../elements/Button';
import Spinner from '../../../../elements/Spinner';

import { ReactComponent as Icon } from '../../../../../assets/images/icon.svg';

import styles from './styles.module.scss';

const WelcomeDialog: React.FC = () => {
  const { t } = useTranslation(['common', 'projects']);

  const handleNewProject = () => {
    // TODO
  };

  const handleOpenProject = () => {
    // TODO
  };

  return (
    <Dialog open={true} onClose={() => {}}>
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
          [styles.loading]: true,
        })}>
          <div className={styles.spinner}>
            <Spinner />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
