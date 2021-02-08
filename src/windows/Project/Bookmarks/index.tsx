import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
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
  IconButton,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';

import { dispatch, State } from '../../../store';
import { appSetOpenNewBookmarkDialog } from '../../../store/actions/appActions';
import RoundedButton from '../../../components/RoundedButton';
import { Bookmark } from '../../../interfaces/bookmarks';
import BookmarkDialog from './BookmarkDialog';
import { handleLinkClick, isValidUrl } from '../../../lib/links';

import styles from './Bookmarks.module.scss';

const { ipcRenderer } = window.require('electron');

type SortDirection = 'asc' | 'desc';

const Bookmarks: React.FC = () => {
  const bookmarks = useSelector((state: State) => state.project?.bookmarks);
  const openNewBookmarkDialog = useSelector((state: State) => state.app.openNewBookmarkDialog);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();
  const [hoverBookmarkId, setHoverBookmarkId] = useState<string>('');

  useEffect(() => {
    ipcRenderer.on('editBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
      setEditingBookmark(bookmark);
      setEditDialogOpen(true);
    });

    return () => {
      ipcRenderer.removeAllListeners('editBookmark');
    };
  }, []);

  useEffect(() => {
    setLocalBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    if (openNewBookmarkDialog) {
      setEditDialogOpen(true);
      dispatch(appSetOpenNewBookmarkDialog(false));
    }
  }, [openNewBookmarkDialog]);

  const handleSort = (sortId: string): void => {
    let newSortDirection = sortDirection;

    if (sortBy === sortId) {
      newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newSortDirection);
    }

    setSortBy(sortId);

    setLocalBookmarks(localBookmarks?.sort((rowA: any, rowB: any) => {
      if (newSortDirection === 'asc') {
        if (rowA[sortId] > rowB[sortId]) {
          return 1;
        }
        else if (rowA[sortId] < rowB[sortId]) {
          return -1;
        }
      }
      else {
        if (rowA[sortId] > rowB[sortId]) {
          return -1;
        }
        else if (rowA[sortId] < rowB[sortId]) {
          return 1;
        }
      }

      return 0;
    }));
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <RoundedButton onClick={() => setEditDialogOpen(true)} className={styles.newButton}>
          <Add fontSize='small' />&nbsp;<FormattedMessage id='bookmarksNewBookmark' />
        </RoundedButton>
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
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        bookmark={editingBookmark}
      />
    </div>
  );
};

export default Bookmarks;
