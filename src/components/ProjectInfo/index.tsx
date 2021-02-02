import React from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import Form from 'react-bootstrap/Form';

import useTranslation from '../../intl/useTranslation';
import ProjectImage from './ProjectImage';

import styles from './ProjectInfo.module.scss';

const ProjectInfo: React.FC = () => {
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
          <label htmlFor='projectName'><FormattedMessage id='projectName' /></label>
          <input
            type='text'
            className='form-control'
            id='projectName'
          />
        </div>

        <div className={styles.formControlWrapper}>
          <label htmlFor='projectDescription'><FormattedMessage id='projectDescription' /></label>
          <textarea
            className={clsx('form-control', styles.projectDescription)}
            id='projectDescription'
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
            id='custom-switch'
            label={useTranslation('projectHasStartDate')}
            className={styles.switch}
          />
          <input
            type='date'
            className='form-control'
            id='startDate'
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
            id='custom-switch'
            label={useTranslation('projectHasEndDate')}
            className={styles.switch}
          />
          <input
            type='date'
            className='form-control'
            id='endDate'
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
