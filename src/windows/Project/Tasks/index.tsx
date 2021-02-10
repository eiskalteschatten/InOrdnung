import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  Button,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { uiSetOpenEditTaskDialog } from '../../../store/actions/uiActions';

import styles from './Tasks.module.scss';

const Tasks: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.toolbar}>
        <Button
          onClick={() => dispatch(uiSetOpenEditTaskDialog(true))}
          variant='contained'
          color='primary'
          size='small'
        >
          <Add fontSize='small' />&nbsp;<FormattedMessage id='tasksNewTask' />
        </Button>
      </div>
    </div>
  );
};

export default Tasks;
