import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { IpcRendererEvent } from 'electron';

import {
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';

import { State } from '../../../store';
import { uiSetOpenEditBookmarkDialog, uiSetBookmarksSortingOptions } from '../../../store/actions/uiActions';
import { Bookmark } from '../../../interfaces/bookmarks';
import BookmarkDialog from './BookmarkDialog';
import { handleLinkClick, isValidUrl } from '../../../lib/links';

import styles from './Bookmarks.module.scss';

const { ipcRenderer } = window.require('electron');

const Bookmarks: React.FC = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: State) => state.project?.bookmarks);
  const sortBy = useSelector((state: State) => state.ui.bookmarksSortingOptions.sortBy);
  const sortDirection = useSelector((state: State) => state.ui.bookmarksSortingOptions.sortDirection);
  const openEditBookmarkDialog = useSelector((state: State) => state.ui.openEditBookmarkDialog);
  const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();
  const [hoverBookmarkId, setHoverBookmarkId] = useState<string>('');

  useEffect(() => {
    ipcRenderer.on('editBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
      setEditingBookmark(bookmark);
      dispatch(uiSetOpenEditBookmarkDialog(true));
    });

    return () => {
      ipcRenderer.removeAllListeners('editBookmark');
    };
  }, []);

  useEffect(() => {
    setLocalBookmarks(bookmarks);
  }, [bookmarks]);

  const handleSort = (newSortBy: string): void => {
    let newSortDirection = sortDirection;

    const sortOptions = {
      sortBy: newSortBy,
      sortDirection,
    };

    if (sortBy === newSortBy) {
      newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      sortOptions.sortDirection = newSortDirection;
    }

    dispatch(uiSetBookmarksSortingOptions(sortOptions));

    setLocalBookmarks(localBookmarks?.sort((rowA: any, rowB: any) => {
      if (newSortDirection === 'asc') {
        if (rowA[newSortBy] > rowB[newSortBy]) {
          return 1;
        }
        else if (rowA[newSortBy] < rowB[newSortBy]) {
          return -1;
        }
      }
      else {
        if (rowA[newSortBy] > rowB[newSortBy]) {
          return -1;
        }
        else if (rowA[newSortBy] < rowB[newSortBy]) {
          return 1;
        }
      }

      return 0;
    }));
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <Button
          onClick={() => dispatch(uiSetOpenEditBookmarkDialog(true))}
          variant='contained'
          color='primary'
          size='small'
        >
          <Add fontSize='small' />&nbsp;<FormattedMessage id='bookmarksNewBookmark' />
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortDirection}
                    onClick={() => handleSort('name')}
                  >
                    <FormattedMessage id='bookmarksName' />
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'url'}
                    direction={sortDirection}
                    onClick={() => handleSort('url')}
                  >
                    <FormattedMessage id='bookmarksUrl' />
                  </TableSortLabel>
                </TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(localBookmarks) && localBookmarks.map((row: any) => (
                <TableRow
                  key={row.name}
                  onMouseEnter={() => setHoverBookmarkId(row.id)}
                  onMouseLeave={() => setHoverBookmarkId('')}
                  onContextMenu={() => ipcRenderer.send('showBookmarkMenu', row)}
                >
                  <TableCell component='th' scope='row'  className={styles.tableCell}>
                    {row.name}
                  </TableCell>
                  <TableCell className={styles.tableCell}>{row.url}</TableCell>
                  <TableCell align='right'>
                    <IconButton
                      size='small'
                      onClick={() => ipcRenderer.send('showBookmarkMenu', row)}
                      className={clsx({
                        [styles.invisible]: hoverBookmarkId !== row.id,
                      })}
                    >
                      <MoreVertIcon fontSize='small' />
                    </IconButton>

                    {isValidUrl(row.url) && (
                      <IconButton
                        size='small'
                        href={row.url}
                        onClick={e => handleLinkClick(e, row.url)}
                        edge='end'
                      >
                        <OpenInBrowser fontSize='small' />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <BookmarkDialog
        open={openEditBookmarkDialog}
        close={() => dispatch(uiSetOpenEditBookmarkDialog(false))}
        bookmark={editingBookmark}
      />
    </div>
  );
};

export default Bookmarks;
