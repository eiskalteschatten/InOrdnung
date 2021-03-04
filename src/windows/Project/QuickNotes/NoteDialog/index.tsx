import React, { useEffect, useState, useMemo } from 'react';
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
import NoteToolbar from '../NoteToolbar';

import styles from './NoteDialog.module.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
  quickNote?: QuickNote;
}

const NoteDialog: React.FC<Props> = ({ open, handleClose, quickNote }) => {
  const quickNotes = useSelector((state: State) => state.project.quickNotes);
  const [editingQuickNote, setEditingQuickNote] = useState<QuickNote | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (quickNote) {
      setEditingQuickNote(quickNote);
    }
  }, [quickNote]);

  const noteExists = useMemo(() => {
    if (quickNotes) {
      const quickNoteIds = quickNotes.map(({ id }) => id);
      return quickNoteIds.some(id => id === editingQuickNote?.id);
    }
    else {
      return false;
    }
  }, [quickNotes, editingQuickNote]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const noteData = {
      ...editingQuickNote,
      [e.target.id]: e.target.value,
    };

    setEditingQuickNote(noteData);

    if (noteData && !noteExists) {
      const newNote = {
        id: uuidv4(),
        ...noteData,
      };

      dispatch(projectAddQuickNote(newNote));
      setEditingQuickNote(newNote);
    }
    else if (noteData) {
      dispatch(projectEditQuickNote(noteData));
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
        <NoteToolbar quickNote={editingQuickNote} />
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
