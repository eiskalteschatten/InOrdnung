import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

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

import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import Add from '@material-ui/icons/Add';

import { State } from '../../../store';
import RoundedButton from '../../../components/RoundedButton';
import { Bookmark } from '../../../interfaces/bookmarks';
import BookmarkDialog from './BookmarkDialog';

import styles from './Bookmarks.module.scss';

type SortDirection = 'asc' | 'desc';

const Bookmarks: React.FC = () => {
  const bookmarks = useSelector((state: State) => state.project?.bookmarks);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();

  useEffect(() => {
    setLocalBookmarks(bookmarks);
  }, [bookmarks]);

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

  const handleNewBookmark = (): void => {
    setEditDialogOpen(true);
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <RoundedButton onClick={handleNewBookmark} className={styles.newButton}>
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
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'  className={styles.tableCell}>
                    {row.name}
                  </TableCell>
                  <TableCell className={styles.tableCell}>{row.url}</TableCell>
                  <TableCell align='right'>
                    <IconButton size='small'>
                      <OpenInBrowser fontSize='small' />
                    </IconButton>
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
