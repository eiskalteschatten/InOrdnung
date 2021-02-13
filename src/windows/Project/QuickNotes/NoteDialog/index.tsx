import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

import { QuickNote } from '../../../../interfaces/quickNotes';
import useTranslation from '../../../../intl/useTranslation';
import { projectAddQuickNote, projectEditQuickNote } from '../../../../store/actions/projectActions/quickNoteActions';

// import styles from './BookmarkDialog.module.scss';

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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <TextField
          margin='dense'
          id='title'
          label={useTranslation('quickNotesTitle')}
          fullWidth
          value={editingQuickNote?.title ?? ''}
          InputLabelProps={{ shrink: !!editingQuickNote?.title }}
          onChange={handleFieldChange}
          size='small'
        />
      </DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          autoFocus
          id='note'
          label={useTranslation('quickNotesNote')}
          fullWidth
          value={editingQuickNote?.note ?? ''}
          InputLabelProps={{ shrink: !!editingQuickNote?.note }}
          onChange={handleFieldChange}
          size='small'
        />
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
