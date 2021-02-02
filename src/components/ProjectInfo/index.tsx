import React from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { State } from '../../store';
import { projectSetProjectInfo } from '../../store/actions/projectActions';
import useTranslation from '../../intl/useTranslation';
import ProjectImage from './ProjectImage';

import styles from './ProjectInfo.module.scss';

const ProjectInfo: React.FC = () => {
  const projectInfo = useSelector((state: State) => state.project.data.projectInfo);
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
          <label htmlFor='projectName'>
            <FormattedMessage id='projectName' />
          </label>
          <input
            type='text'
            className='form-control'
            id='projectName'
            value={projectInfo?.name}
            onChange={handleFieldChange}
          />
        </div>

        <div className={styles.formControlWrapper}>
          <label htmlFor='projectDescription'>
            <FormattedMessage id='projectDescription' />
          </label>
          <textarea
            className={clsx('form-control', styles.projectDescription)}
            id='projectDescription'
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
          <Form.Check
            type='switch'
            id='hasStartDate'
            label={useTranslation('projectHasStartDate')}
            className={styles.switch}
            checked={projectInfo?.hasStartDate}
            onChange={handleSwitchChange}
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
          <Form.Check
            type='switch'
            id='hasEndDate'
            label={useTranslation('projectHasEndDate')}
            className={styles.switch}
            checked={projectInfo?.hasEndDate}
            onChange={handleSwitchChange}
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
