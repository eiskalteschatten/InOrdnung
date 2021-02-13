import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { IpcRendererEvent } from 'electron';

import {
  TextField,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import useTranslation from '../../../intl/useTranslation';

import styles from './QuickNotes.module.scss';

const { ipcRenderer } = window.require('electron');

const QuickNotes: React.FC = () => {
  const handleNewNoteClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log('onclick');
  };

  return (
    <div>
      <div className={styles.newQuickNoteWrapper}>
        <TextField
          label={`${useTranslation('quickNotesNewNote')}...`}
          variant='filled'
          className={styles.newQuickNote}
          onClick={handleNewNoteClick}
          size='small'
        />
      </div>
    </div>
  );
};

export default QuickNotes;
