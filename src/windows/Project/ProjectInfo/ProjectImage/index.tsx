import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import {
  ButtonBase,
} from '@material-ui/core';

import { State } from '../../../../store';

import styles from './ProjectImage.module.scss';

const ProjectImage: React.FC = () => {
  const projectImage = useSelector((state: State) => state.project.projectInfo.image);
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
    window.api.send('handleProjectImageDrop', e.dataTransfer.files[0].path);
  };

  const handleClick = (): void => {
    window.api.send('selectProjectImage');
  };

  const handleCm = (): void => {
    window.api.send('showProjectImageContextMenu');
  };

  return (
    <ButtonBase
      className={clsx({
        [styles.projectImage]: true,
        [styles.isDragging]: isDraggingOver,
        [styles.noImage]: !projectImage?.image,
      })}
    >
      <div
        className={styles.dropZone}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleOnDrop}
        onClick={handleClick}
        onContextMenu={handleCm}
      >
        {projectImage ? (
          <img src={`data:${projectImage.mimeType};base64,${projectImage.image}`} className={styles.image} />
        ) :(
          <FormattedMessage id='dragOrClickProjectImage' />
        )}
      </div>
    </ButtonBase>
  );
};

export default ProjectImage;
