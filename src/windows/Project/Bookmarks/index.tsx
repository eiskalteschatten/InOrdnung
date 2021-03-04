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
import { uiSetBookmarksSortingOptions } from '../../../store/actions/uiActions';
import { uiSetOpenEditBookmarkDialog } from '../../../store/actions/uiTempActions';
import { Bookmark } from '../../../interfaces/bookmarks';
import { handleLinkClick, isValidUrl } from '../../../lib/links';
import { sortStrings } from '../../../lib/helper';
import BookmarkDialog from './BookmarkDialog';

import styles from './Bookmarks.module.scss';

const Bookmarks: React.FC = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: State) => state.project?.bookmarks);
  const sortBy = useSelector((state: State) => state.ui.bookmarksSortingOptions.sortBy);
  const sortDirection = useSelector((state: State) => state.ui.bookmarksSortingOptions.sortDirection);
  const openEditBookmarkDialog = useSelector((state: State) => state.uiTemp.openEditBookmarkDialog);
  const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();
  const [hoverBookmarkId, setHoverBookmarkId] = useState<string>('');

  useEffect(() => {
    window.api.on('editBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
      setEditingBookmark(bookmark);
    });

    return () => {
      window.api.removeAllListeners('editBookmark');
    };
  }, []);

  useEffect(() => {
    setLocalBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    if (editingBookmark) {
      dispatch(uiSetOpenEditBookmarkDialog(true));
    }
  }, [editingBookmark]);

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

    setLocalBookmarks(localBookmarks?.sort((rowA: any, rowB: any) => sortStrings(rowA[newSortBy], rowB[newSortBy], newSortDirection)));
  };

  const handleDoubleClick = (bookmark: Bookmark): void => {
    setEditingBookmark(bookmark);
  };

  const handleCloseDialog = (): void => {
    setEditingBookmark(undefined);
    dispatch(uiSetOpenEditBookmarkDialog(false));
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
                  key={row.id}
                  onMouseEnter={() => setHoverBookmarkId(row.id)}
                  onMouseLeave={() => setHoverBookmarkId('')}
                  onContextMenu={() => window.api.send('showBookmarkMenu', row)}
                  onDoubleClick={() => handleDoubleClick(row)}
                >
                  <TableCell component='th' scope='row'  className={styles.tableCell}>
                    {row.name}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <a href={row.url} onClick={e => handleLinkClick(e, row.url)} className={styles.url}>
                      {row.url}
                    </a>
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      size='small'
                      onClick={() => window.api.send('showBookmarkMenu', row)}
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

      {openEditBookmarkDialog && (
        <BookmarkDialog
          open={openEditBookmarkDialog}
          handleClose={handleCloseDialog}
          bookmark={editingBookmark}
        />
      )}
    </div>
  );
};

export default Bookmarks;
