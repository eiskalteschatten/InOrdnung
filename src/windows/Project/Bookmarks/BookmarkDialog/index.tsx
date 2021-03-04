import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

import { Bookmark } from '../../../../interfaces/bookmarks';
import useTranslation from '../../../../intl/useTranslation';
import { projectAddBookmark, projectEditBookmark } from '../../../../store/actions/projectActions/bookmarkActions';

// import styles from './BookmarkDialog.module.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
  bookmark?: Bookmark;
}

const BookmarkDialog: React.FC<Props> = ({ open, handleClose, bookmark }) => {
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmark) {
      setEditingBookmark(bookmark);
    }
  }, [bookmark]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingBookmark({
      ...editingBookmark,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = (): void => {
    if (!bookmark && editingBookmark) {
      dispatch(projectAddBookmark({
        id: uuidv4(),
        ...editingBookmark,
      }));
    }
    else if (editingBookmark) {
      dispatch(projectEditBookmark(editingBookmark));
    }

    handleClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleSave();
        break;
      case 'Esc':
        handleClose();
        break;
    }
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
          variant='outlined'
          fullWidth
          value={editingBookmark?.name ?? ''}
          InputLabelProps={{ shrink: !!editingBookmark?.name }}
          onChange={handleFieldChange}
          size='small'
          onKeyDown={onKeyDown}
        />
        <TextField
          margin='dense'
          id='url'
          label={useTranslation('bookmarksUrl')}
          variant='outlined'
          fullWidth
          value={editingBookmark?.url ?? ''}
          InputLabelProps={{ shrink: !!editingBookmark?.url }}
          onChange={handleFieldChange}
          size='small'
          onKeyDown={onKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' color='primary' size='small'>
          <FormattedMessage id='cancel' />
        </Button>
        <Button onClick={handleSave} variant='contained' color='primary' size='small'>
          <FormattedMessage id='save' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookmarkDialog;
