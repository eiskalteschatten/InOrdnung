import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import styles from './ProjectImage.module.scss';

const { ipcRenderer } = window.require('electron');

const ProjectImage: React.FC = () => {
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    setIsDraggingOver(false);
    ipcRenderer.send('handleProjectImageDrop', e.dataTransfer.files[0].path);
  };

  const handleClick = (): void => {
    ipcRenderer.send('selectProjectImage');
  };

  // TODO: add context menu

  return (
    <div
      className={clsx({
        [styles.projectImage]: true,
        [styles.isDragging]: isDraggingOver,
      })}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      onClick={handleClick}
    >
      <FormattedMessage id='dragOrClickProjectImage' />
    </div>
  );
};

export default ProjectImage;
