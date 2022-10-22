import React from 'react';
import { useTranslation } from 'react-i18next';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';
import Input from '../../components/elements/Input';
import MonacoEditor from '../../components/elements/MonacoEditor';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setDescription, setName } from '../../store/entities/project/info';

import styles from './styles.module.scss';

const ProjectInfo: React.FC = () => {
  const { t } = useTranslation(['projectInfo']);
  const dispatch = useAppDispatch();
  const { name, description } = useAppSelector(state => state.project.info);

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding centered>
        <div className={styles.projectInfo}>
          <Input
            label={t('projectInfo:projectName')}
            fullWidth
            value={name}
            onChange={e => dispatch(setName(e.target.value))}
          />

          <MonacoEditor
            height='200px'
            defaultLanguage='markdown'
            value={description}
            onChange={value => dispatch(setDescription(value || ''))}
            minimap={false}
            label={`${t('common:description')}`}
          />
        </div>
      </Column>
    </ProjectLayout>
  );
};

export default ProjectInfo;
