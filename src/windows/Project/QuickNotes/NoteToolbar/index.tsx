import React from 'react';

import {
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { QuickNote } from '../../../../interfaces/quickNotes';

import styles from './NoteToolbar.module.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  quickNote?: QuickNote;
}

const NoteToolbar: React.FC<Props> = ({ quickNote }) => {
  const handleDeleteNote = (): void => {
    ipcRenderer.send('deleteQuickNote', quickNote);
  };

  return (
    <div className={styles.noteToolbar}>
      <div className={styles.leftSide}>

      </div>
      <div className={styles.rightSide}>
        <IconButton size='small' color='inherit' onClick={handleDeleteNote}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </div>
    </div>
  );
};

export default NoteToolbar;
