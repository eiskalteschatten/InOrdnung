import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';

import { QuickNote } from '../../../../interfaces/quickNotes';
import RoundedButton from '../../../../components/RoundedButton';

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
        <RoundedButton
          size='small'
          onClick={handleDeleteNote}
          dark
        >
          <DeleteIcon fontSize='small' />
        </RoundedButton>
      </div>
    </div>
  );
};

export default NoteToolbar;
