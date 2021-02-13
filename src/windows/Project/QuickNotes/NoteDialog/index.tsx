import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  IconButton,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { State } from '../../../../store';
import { projectAddQuickNote, projectEditQuickNote } from '../../../../store/actions/projectActions/quickNoteActions';
import { QuickNote } from '../../../../interfaces/quickNotes';
import useTranslation from '../../../../intl/useTranslation';

import styles from './NoteDialog.module.scss';

interface Props {
  open: boolean;
  close: () => void;
  quickNote?: QuickNote;
}

const NoteDialog: React.FC<Props> = ({ open, close, quickNote }) => {
  const quickNotes = useSelector((state: State) => state.project.quickNotes);
  const [editingQuickNote, setEditingQuickNote] = useState<QuickNote | undefined>();
  const [noteExists, setNoteExists] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditingQuickNote(quickNote ? quickNote : {
      id: uuidv4(),
    });
  }, [quickNote]);

  useEffect(() => {
    if (quickNotes) {
      const quickNoteIds = quickNotes.map(({ id }) => id);
      setNoteExists(quickNoteIds.some(id => id === editingQuickNote?.id));
    }
  }, [quickNotes, editingQuickNote]);

  const handleClose = (): void => {
    setEditingQuickNote(undefined);
    close();
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingQuickNote({
      ...editingQuickNote,
      [e.target.id]: e.target.value,
    });

    handleSave();
  };

  const handleSave = (): void => {
    if (editingQuickNote && !noteExists) {
      console.log('add');
      dispatch(projectAddQuickNote(editingQuickNote));
    }
    else if (editingQuickNote) {
      console.log('edit');
      dispatch(projectEditQuickNote(editingQuickNote));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{ className: styles.dialog }}
    >
      <DialogContent>
        <IconButton
          className={styles.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <InputBase
          margin='dense'
          id='title'
          fullWidth
          value={editingQuickNote?.title ?? ''}
          inputProps={{ className: styles.titleField }}
          onChange={handleFieldChange}
          placeholder={useTranslation('quickNotesTitle')}
          className={styles.title}
        />

        <InputBase
          margin='dense'
          autoFocus
          id='note'
          fullWidth
          value={editingQuickNote?.note ?? ''}
          inputProps={{ className: styles.textField }}
          onChange={handleFieldChange}
          multiline
          rows={10}
          placeholder={useTranslation('quickNotesNote')}
        />
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
