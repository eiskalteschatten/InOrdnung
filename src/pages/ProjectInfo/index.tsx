import React from 'react';
import { useTranslation } from 'react-i18next';

import Toolbar from './components/Toolbar';
import MainLayout from '../../components/layouts/MainLayout';
import Column from '../../components/elements/Column';
import Input from '../../components/elements/Input';
import TextArea from '../../components/elements/TextArea';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setDescription, setName } from '../../store/entities/project/info';

import styles from './styles.module.scss';

const ProjectInfo: React.FC = () => {
  const { t } = useTranslation(['projectInfo']);
  const dispatch = useAppDispatch();
  const { name, description } = useAppSelector(state => state.project.info);

  return (
    <MainLayout
      toolbar={<Toolbar />}
    >
      <Column flexGrow centered padding>
        <div className={styles.projectInfo}>
          <Input
            label={t('projectInfo:projectName')}
            fullWidth
            value={name}
            onChange={e => dispatch(setName(e.target.value))}
          />

          <TextArea
            label={t('projectInfo:description')}
            fullWidth
            value={description}
            onChange={e => dispatch(setDescription(e.target.value))}
          />
        </div>
      </Column>
    </MainLayout>
  );
};

export default ProjectInfo;
