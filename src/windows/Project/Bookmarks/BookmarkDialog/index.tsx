import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';

import { State } from '../../../../store';
import { Bookmark } from '../../../../interfaces/bookmarks';
import useTranslation from '../../../../intl/useTranslation';

// import styles from './BookmarkDialog.module.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
  bookmark?: Bookmark;
}

const BookmarkDialog: React.FC<Props> = ({ open, handleClose, bookmark }) => {
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();

  useEffect(() => {
    setEditingBookmark(bookmark ? bookmark : {
      id: uuidv4(),
    });
  }, [bookmark]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingBookmark({
      ...editingBookmark,
      [e.target.id]: e.target.value,
    });
  };

  const handleCancel = (): void => {
    setEditingBookmark(undefined);
    handleClose();
  };

  const handleSave = (): void => {

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {bookmark ? (
          <FormattedMessage id='bookmarksEditBookmark' />
        ) : (
          <FormattedMessage id='bookmarksNewBookmark' />
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label={useTranslation('bookmarksName')}
          variant='filled'
          fullWidth
          value={editingBookmark?.name ?? ''}
          InputLabelProps={{ shrink: !!editingBookmark?.name }}
          onChange={handleFieldChange}
        />

        <TextField
          margin='dense'
          id='url'
          label={useTranslation('bookmarksUrl')}
          variant='filled'
          fullWidth
          value={editingBookmark?.url ?? ''}
          InputLabelProps={{ shrink: !!editingBookmark?.url }}
          onChange={handleFieldChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant='outlined' color='primary'>
          <FormattedMessage id='cancel' />
        </Button>
        <Button onClick={handleSave} variant='contained' color='primary'>
          <FormattedMessage id='save' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookmarkDialog;
