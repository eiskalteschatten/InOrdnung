import React from 'react';
import { useDispatch } from 'react-redux';

import {
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { QuickNote } from '../../../../interfaces/quickNotes';

import styles from './NoteToolbar.module.scss';

interface Props {
  quickNote: QuickNote;
}

const NoteToolbar: React.FC<Props> = ({ quickNote }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.noteToolbar}>
      <div className={styles.leftSide}>

      </div>
      <div className={styles.rightSide}>
        <IconButton size='small' color='inherit'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </div>
    </div>
  );
};

export default NoteToolbar;
