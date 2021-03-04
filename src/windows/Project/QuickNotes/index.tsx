import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IpcRendererEvent } from 'electron';

import {
  TextField,
  Grid,
  Paper,
} from '@material-ui/core';

import { State } from '../../../store';
import { uiSetOpenEditQuickNoteDialog } from '../../../store/actions/uiTempActions';
import useTranslation from '../../../intl/useTranslation';
import { QuickNote } from '../../../interfaces/quickNotes';
import NoteDialog from './NoteDialog';
import NoteToolbar from './NoteToolbar';

import styles from './QuickNotes.module.scss';

const QuickNotes: React.FC = () => {
  const dispatch = useDispatch();
  const [editingQuickNote, setEditingQuickNote] = useState<QuickNote | undefined>();
  const openEditQuickNoteDialog = useSelector((state: State) => state.uiTemp.openEditQuickNoteDialog);
  const quickNotes = useSelector((state: State) => state.project.quickNotes);

  const handleNewNoteClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(uiSetOpenEditQuickNoteDialog(true));
    (e.target as HTMLInputElement).blur();
  };

  const handleOpenNote = (quickNote: QuickNote): void => {
    setEditingQuickNote(quickNote);
  };

  const handleCloseDialog = (): void => {
    setEditingQuickNote(undefined);
    dispatch(uiSetOpenEditQuickNoteDialog(false));
  };

  useEffect(() => {
    window.api.on('editQuickNote', (e: IpcRendererEvent, quickNote: QuickNote): void => {
      setEditingQuickNote(quickNote);
    });

    return () => {
      window.api.removeAllListeners('editQuickNote');
    };
  }, []);

  useEffect(() => {
    if (editingQuickNote) {
      dispatch(uiSetOpenEditQuickNoteDialog(true));
    }
  }, [editingQuickNote]);

  return (
    <div>
      <div className={styles.newQuickNoteWrapper}>
        <TextField
          label={`${useTranslation('quickNotesNewNote')}...`}
          variant='filled'
          className={styles.newQuickNote}
          onClick={handleNewNoteClick}
          size='small'
          InputLabelProps={{ shrink: false }}
        />
      </div>

      <div className={styles.gridWrapper}>
        <Grid container spacing={2}>
          {quickNotes?.map((quickNote: QuickNote) => (
            <Grid
              item
              key={quickNote.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onContextMenu={() => window.api.send('showQuickNoteMenu', quickNote)}
            >
              <Paper className={styles.quickNote}>
                <div onClick={() => handleOpenNote(quickNote)} className={styles.noteContents}>
                  <div className={styles.title}>{quickNote.title}</div>
                  <div className={styles.note}>{quickNote.note}</div>
                </div>

                <div className={styles.toolbarWrapper}>
                  <NoteToolbar quickNote={quickNote} />
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      {openEditQuickNoteDialog && (
        <NoteDialog
          open={openEditQuickNoteDialog}
          handleClose={handleCloseDialog}
          quickNote={editingQuickNote}
        />
      )}
    </div>
  );
};

export default QuickNotes;
