import React from 'react';
import { useTranslation } from 'react-i18next';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
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
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow centered padding fullWidth>
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
    </ProjectLayout>
  );
};

export default ProjectInfo;
