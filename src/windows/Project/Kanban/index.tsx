import React, { useEffect, useState } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { useDispatch, useSelector } from 'react-redux';
// import clsx from 'clsx';
// import { IpcRendererEvent } from 'electron';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableSortLabel,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
// } from '@material-ui/core';

// import Add from '@material-ui/icons/Add';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import OpenInBrowser from '@material-ui/icons/OpenInBrowser';

// import { State } from '../../../store';
// import { uiSetOpenEditBookmarkDialog, uiSetBookmarksSortingOptions } from '../../../store/actions/uiActions';
// import { Bookmark } from '../../../interfaces/bookmarks';
// import { handleLinkClick, isValidUrl } from '../../../lib/links';
// import { sortStrings } from '../../../lib/helper';
// import BookmarkDialog from './BookmarkDialog';

// import styles from './Kanban.module.scss';

// const { ipcRenderer } = window.require('electron');

const Kanban: React.FC = () => {
  // const dispatch = useDispatch();
  // const bookmarks = useSelector((state: State) => state.project?.bookmarks);
  // const openEditBookmarkDialog = useSelector((state: State) => state.ui.openEditBookmarkDialog);
  // const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>();
  // const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();
  // const [hoverBookmarkId, setHoverBookmarkId] = useState<string>('');

  // useEffect(() => {
  //   ipcRenderer.on('editBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  //     setEditingBookmark(bookmark);
  //     dispatch(uiSetOpenEditBookmarkDialog(true));
  //   });

  //   return () => {
  //     ipcRenderer.removeAllListeners('editBookmark');
  //   };
  // }, []);

  // useEffect(() => {
  //   setLocalBookmarks(bookmarks);
  // }, [bookmarks]);


  return (
    <div>
      kanban
    </div>
  );
};

export default Kanban;
