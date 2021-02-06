import React from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import {
  FormControlLabel,
  Switch,
  TextField,
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

      <div className={styles.formGroup}>
        <div className={styles.formControlWrapper}>
          <TextField
            id='name'
            label={useTranslation('projectName')}
            variant='outlined'
            value={projectInfo?.name}
            onChange={handleFieldChange}
            className={styles.textField}
            InputLabelProps={{ shrink: !!projectInfo?.name }}
          />
        </div>

        <div className={styles.formControlWrapper}>
          <TextField
            id='description'
            label={useTranslation('projectDescription')}
            variant='outlined'
            value={projectInfo?.description}
            onChange={handleFieldChange}
            className={styles.textField}
            InputLabelProps={{ shrink: !!projectInfo?.name }}
            multiline
            rows={4}
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
