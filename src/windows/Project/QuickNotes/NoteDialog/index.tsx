import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
} from '@material-ui/core';

import { QuickNote } from '../../../../interfaces/quickNotes';
import useTranslation from '../../../../intl/useTranslation';
import { projectAddQuickNote, projectEditQuickNote } from '../../../../store/actions/projectActions/quickNoteActions';

import styles from './NoteDialog.module.scss';

interface Props {
  open: boolean;
  close: () => void;
  quickNote?: QuickNote;
}

const NoteDialog: React.FC<Props> = ({ open, close, quickNote }) => {
  const [editingQuickNote, setEditingQuickNote] = useState<QuickNote | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    setEditingQuickNote(quickNote ? quickNote : {
      id: uuidv4(),
    });
  }, [quickNote]);

  const handleClose = (): void => {
    setEditingQuickNote(undefined);
    close();
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingQuickNote({
      ...editingQuickNote,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = (): void => {
    if (!quickNote && editingQuickNote) {
      dispatch(projectAddQuickNote(editingQuickNote));
    }
    else if (editingQuickNote) {
      dispatch(projectEditQuickNote(editingQuickNote));
    }

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{ className: styles.dialog }}
    >
      <DialogContent>
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
