import React from 'react';
import { useTranslation } from 'react-i18next';

import Toolbar from './components/Toolbar';
import MainLayout from '../../components/layouts/MainLayout';
import Column from '../../components/elements/Column';
import Input from '../../components/elements/Input';
import TextArea from '../../components/elements/TextArea';

import styles from './styles.module.scss';

const ProjectInfo: React.FC = () => {
  const { t } = useTranslation(['projectInfo']);

  return (
    <MainLayout
      toolbar={<Toolbar />}
    >
      <Column flexGrow centered padding>
        <div className={styles.projectInfo}>
          <Input
            label={t('projectInfo:projectName')}
            fullWidth
          />

          <TextArea
            label={t('projectInfo:description')}
            fullWidth
          />
        </div>
      </Column>
    </MainLayout>
  );
};

export default ProjectInfo;
