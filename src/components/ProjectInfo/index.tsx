import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './ProjectInfo.module.scss';

const ProjectInfo: React.FC = () => {
  return (
    <div className={styles.projectInfo}>
      <div className={styles.projectImage}>
        <FormattedMessage id='dragOrClickProjectImage' />
      </div>


    </div>
  );
};

export default ProjectInfo;
