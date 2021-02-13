import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IpcRendererEvent } from 'electron';

import {
  TextField,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { State } from '../../../store';
import useTranslation from '../../../intl/useTranslation';
import { QuickNote } from '../../../interfaces/quickNotes';
import NoteDialog from './NoteDialog';

import styles from './QuickNotes.module.scss';

const { ipcRenderer } = window.require('electron');

const QuickNotes: React.FC = () => {
  const dispatch = useDispatch();
  const [editingQuickNote, setEditingQuickNote] = useState<QuickNote | undefined>();
  const openEditQuickNotDialog = useSelector((state: State) => state.ui.openEditQuickNotDialog);

  const handleNewNoteClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log('onclick');
  };

  return (
    <div>
      <div className={styles.newQuickNoteWrapper}>
        <TextField
          label={`${useTranslation('quickNotesNewNote')}...`}
          variant='filled'
          className={styles.newQuickNote}
          onClick={handleNewNoteClick}
          size='small'
        />
      </div>

      <NoteDialog
        open={openEditQuickNotDialog}
        close={() => dispatch(uiSetOpenEditBookmarkDialog(false))}
        quickNote={editingQuickNote}
      />
    </div>
  );
};

export default QuickNotes;
