import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IpcRendererEvent } from 'electron';

import {
  TextField,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { State } from '../../../store';
import { uiSetOpenEditQuickNoteDialog } from '../../../store/actions/uiActions';
import useTranslation from '../../../intl/useTranslation';
import { QuickNote } from '../../../interfaces/quickNotes';
import NoteDialog from './NoteDialog';

import styles from './QuickNotes.module.scss';

const { ipcRenderer } = window.require('electron');

const QuickNotes: React.FC = () => {
  const dispatch = useDispatch();
  const [editingQuickNote, setEditingQuickNote] = useState<QuickNote | undefined>();
  const openEditQuickNoteDialog = useSelector((state: State) => state.ui.openEditQuickNoteDialog);

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
        open={openEditQuickNoteDialog}
        close={() => dispatch(uiSetOpenEditQuickNoteDialog(false))}
        quickNote={editingQuickNote}
      />
    </div>
  );
};

export default QuickNotes;
