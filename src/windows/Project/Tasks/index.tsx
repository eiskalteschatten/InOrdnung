import React from 'react';
import { FormattedMessage } from 'react-intl';

import Add from '@material-ui/icons/Add';

import RoundedButton from '../../../components/RoundedButton';

import styles from './Tasks.module.scss';

const Tasks: React.FC = () => {
  return (
    <div>
      <div className={styles.toolbar}>
        {/* <RoundedButton onClick={() => dispatch(uiSetOpenEditBookmarkDialog(true))}> */}
        <RoundedButton onClick={() => console.log('add task')}>
          <Add fontSize='small' />&nbsp;<FormattedMessage id='tasksNewTask' />
        </RoundedButton>
      </div>
    </div>
  );
};

export default Tasks;
