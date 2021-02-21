import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  FormControl,
  Select,
  Button,
  InputLabel,
} from '@material-ui/core';

import useTranslation from '../../../../intl/useTranslation';
import { projectAddKanbanTask, projectEditKanbanTask } from '../../../../store/actions/projectActions/kanbanActions';
import { Context } from '../KanbanContextWrapper';

import styles from './TaskDialog.module.scss';

interface Props {
  open: boolean;
  close: () => void;
}

const TaskDialog: React.FC<Props> = ({ open, close }) => {
  const dispatch = useDispatch();
  const context = useContext(Context);

  useEffect(() => {
    if (!context.editingTask) {
      context.setEditingTask({
        id: uuidv4(),
        columnId: context.editColumnId,
      });
    }
  }, [context]);

  const handleClose = (): void => {
    context.setEditingTask(undefined);
    close();
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    context.setEditingTask({
      ...context.editingTask,
      [e.target.id]: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    const columnId = e.target.value as string;

    context.setEditingTask({
      ...context.editingTask,
      columnId,
    });

    context.setEditColumnId(columnId);
  };

  const handleSave = (): void => {
    if (context.isNewTask && context.editingTask) {
      dispatch(projectAddKanbanTask(context.editingTask));
    }
    else if (context.editingTask) {
      dispatch(projectEditKanbanTask(context.editingTask));
    }

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: styles.paper }}
    >
      <DialogTitle>
        {context.isNewTask ? (
          <FormattedMessage id='kanbanNewTask' />
        ) : (
          <FormattedMessage id='kanbanEditTask' />
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <TextField
              autoFocus
              margin='dense'
              id='title'
              label={useTranslation('kanbanTitle')}
              variant='outlined'
              fullWidth
              value={context.editingTask?.title ?? ''}
              InputLabelProps={{ shrink: !!context.editingTask?.title }}
              onChange={handleFieldChange}
              size='small'
            />
            <TextField
              margin='dense'
              id='description'
              label={useTranslation('kanbanDescription')}
              variant='outlined'
              fullWidth
              value={context.editingTask?.description ?? ''}
              InputLabelProps={{ shrink: !!context.editingTask?.description }}
              onChange={handleFieldChange}
              size='small'
              multiline
              rows={15}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl variant='outlined' fullWidth size='small' margin='dense'>
              <InputLabel>{useTranslation('kanbanStatus')}</InputLabel>
              <Select
                id='columnId'
                value={context.editColumnId}
                onChange={handleStatusChange}
                fullWidth
                label={useTranslation('kanbanStatus')}
                native
              >
                {context.editBoard?.columns?.map(column => (
                  <option value={column.id} key={column.id}>
                    {column.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
