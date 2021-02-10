import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import Add from '@material-ui/icons/Add';

import RoundedButton from '../../../components/RoundedButton';
import { uiSetOpenEditTaskDialog } from '../../../store/actions/uiActions';

import styles from './Tasks.module.scss';

const Tasks: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.toolbar}>
        <RoundedButton onClick={() => dispatch(uiSetOpenEditTaskDialog(true))} variant='contained'>
          <Add fontSize='small' />&nbsp;<FormattedMessage id='tasksNewTask' />
        </RoundedButton>
      </div>
    </div>
  );
};

export default Tasks;
