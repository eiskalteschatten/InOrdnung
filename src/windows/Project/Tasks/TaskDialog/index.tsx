import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Task } from '../../../../interfaces/tasks';
import useTranslation from '../../../../intl/useTranslation';
import { IntlContext } from '../../../../intl/IntlContext';
import { projectAddTask, projectEditTask } from '../../../../store/actions/projectActions/taskActions';
import { getDateLocaleFormat } from '../../../../lib/dates';

// import styles from './TaskDialog.module.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
  task?: Task;
}

const TaskDialog: React.FC<Props> = ({ open, handleClose, task }) => {
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const dispatch = useDispatch();
  const { locale, messages } = useContext(IntlContext);

  useEffect(() => {
    if (task) {
      setEditingTask(task);
    }
  }, [task]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingTask({
      ...editingTask,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = (): void => {
    if (!task && editingTask) {
      dispatch(projectAddTask({
        id: uuidv4(),
        ...editingTask,
      }));
    }
    else if (editingTask) {
      dispatch(projectEditTask(editingTask));
    }

    handleClose();
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingTask({
      ...editingTask,
      [e.target.id]: !!e.target.checked,
    });
  };

  const handleDateChange = (id: string, date: MaterialUiPickersDate): void => {
    const saveDate = moment(date).format('yyyy-MM-DD');

    setEditingTask({
      ...editingTask,
      [id]: saveDate?.toString(),
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleSave();
        break;
      case 'Esc':
        handleClose();
        break;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {task ? (
          <FormattedMessage id='tasksEditTask' />
        ) : (
          <FormattedMessage id='tasksNewTask' />
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label={useTranslation('tasksName')}
          variant='outlined'
          fullWidth
          value={editingTask?.name ?? ''}
          InputLabelProps={{ shrink: !!editingTask?.name }}
          onChange={handleFieldChange}
          size='small'
          onKeyDown={onKeyDown}
        />
        <TextField
          margin='dense'
          id='note'
          label={useTranslation('tasksNote')}
          variant='outlined'
          fullWidth
          value={editingTask?.note ?? ''}
          InputLabelProps={{ shrink: !!editingTask?.note }}
          onChange={handleFieldChange}
          size='small'
          multiline
          rows={3}
        />

        <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
          <FormControlLabel
            control={
              <Switch
                checked={editingTask?.hasDueDate ?? false}
                onChange={handleSwitchChange}
                id='hasDueDate'
                color='primary'
              />
            }
            label={messages.tasksDueDate}
          />

          {editingTask?.hasDueDate && (
            <KeyboardDatePicker
              margin='normal'
              id='dueDate'
              format={getDateLocaleFormat()}
              value={editingTask?.dueDate}
              onChange={(date: MaterialUiPickersDate) => handleDateChange('dueDate', date)}
              disableToolbar
              fullWidth
            />
          )}
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' color='primary' size='small'>
          <FormattedMessage id='cancel' />
        </Button>
        <Button onClick={handleSave} variant='contained' color='primary' size='small'>
          <FormattedMessage id='save' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
