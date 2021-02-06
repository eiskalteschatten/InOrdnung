import React from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import {
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import { State } from '../../store';
import { projectSetProjectInfo } from '../../store/actions/projectActions';
import useTranslation from '../../intl/useTranslation';
import ProjectImage from './ProjectImage';

import styles from './ProjectInfo.module.scss';

const ProjectInfo: React.FC = () => {
  const projectInfo = useSelector((state: State) => state.project.projectInfo);
  const dispatch = useDispatch();

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(projectSetProjectInfo({
      ...projectInfo,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(projectSetProjectInfo({
      ...projectInfo,
      [e.target.id]: !!e.target.checked,
    }));
  };

  return (
    <div className={styles.projectInfo}>
      <ProjectImage />

      <div
        className={clsx(
          'form-group',
          styles.formGroup
        )}
      >
        <div className={styles.formControlWrapper}>
          <label htmlFor='name'>
            <FormattedMessage id='projectName' />
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={projectInfo?.name}
            onChange={handleFieldChange}
          />
        </div>

        <div className={styles.formControlWrapper}>
          <label htmlFor='description'>
            <FormattedMessage id='projectDescription' />
          </label>
          <textarea
            className={clsx('form-control', styles.projectDescription)}
            id='description'
            value={projectInfo?.description}
            onChange={handleFieldChange}
          />
        </div>
      </div>

      <div
        className={clsx(
          'form-group',
          styles.formGroup
        )}
      >
        <div className={styles.formControlWrapper}>
          <FormControlLabel
            control={
              <Switch
                checked={projectInfo?.hasStartDate}
                onChange={handleSwitchChange}
                className={styles.switch}
                name='hasStartDate'
              />
            }
            label={useTranslation('projectHasStartDate')}
          />

          {projectInfo?.hasStartDate && (
            <input
              type='date'
              className='form-control'
              id='startDate'
              value={projectInfo?.startDate}
              onChange={handleFieldChange}
            />
          )}
        </div>
      </div>

      <div
        className={clsx(
          'form-group',
          styles.formGroup
        )}
      >
        <div className={styles.formControlWrapper}>
          <FormControlLabel
            control={
              <Switch
                checked={projectInfo?.hasEndDate}
                onChange={handleSwitchChange}
                className={styles.switch}
                name='hasEndDate'
              />
            }
            label={useTranslation('projectHasEndDate')}
          />

          {projectInfo?.hasEndDate && (
            <input
              type='date'
              className='form-control'
              id='endDate'
              value={projectInfo?.endDate}
              onChange={handleFieldChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
