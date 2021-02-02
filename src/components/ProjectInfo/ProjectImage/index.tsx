import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import styles from './ProjectImage.module.scss';

const ProjectImage: React.FC = () => {
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const handleOnDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleOnDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleOnDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  // TODO: add context menu!

  return (
    <div
      className={clsx({
        [styles.projectImage]: true,
        [styles.isDragging]: isDraggingOver
      })}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
    >
      <FormattedMessage id='dragOrClickProjectImage' />
    </div>
  );
};

export default ProjectImage;
