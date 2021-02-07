import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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

import styles from './Bookmarks.module.scss';

function createData(name: string, url: string) {
  return { name, url };
}

const rows = [
  createData('AlexSeifert.com', 'https://www.alexseifert.com'),
  createData('History Rhymes', 'https://www.historyrhymes.info'),
  createData('Developer\'s Notebook', 'https://www.developers-notebook.com'),
];

type SortDirection = 'asc' | 'desc';

const Bookmarks: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [mockRows, setMockRows] = useState(rows);

  const handleSort = (sortId: string): void => {
    let newSortDirection = sortDirection;

    if (sortBy === sortId) {
      newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newSortDirection);
    }

    setSortBy(sortId);

    setMockRows(mockRows.sort((rowA: any, rowB: any) => {
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
    <div className={styles.wrapper}>
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
            {mockRows.map((row: any) => (
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
  );
};

export default Bookmarks;
