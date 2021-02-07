import React from 'react';
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

const Bookmarks: React.FC = () => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>
                URL
              </TableSortLabel>
            </TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
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
  );
};

export default Bookmarks;
