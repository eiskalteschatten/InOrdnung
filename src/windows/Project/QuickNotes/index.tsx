import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { IpcRendererEvent } from 'electron';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styles from './QuickNotes.module.scss';

const { ipcRenderer } = window.require('electron');

const QuickNotes: React.FC = () => {

  return (
    <div>
      Quick notes
    </div>
  );
};

export default QuickNotes;
