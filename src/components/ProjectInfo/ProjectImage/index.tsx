import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './ProjectImage.module.scss';

const ProjectImage: React.FC = () => {
  return (
    <div className={styles.projectImage}>
      <FormattedMessage id='dragOrClickProjectImage' />
    </div>
  );
};

export default ProjectImage;
