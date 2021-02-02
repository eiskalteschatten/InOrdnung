import React from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

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
    </div>
  );
};

export default ProjectInfo;
