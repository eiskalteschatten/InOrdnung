import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill';

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
  IconButton,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import useTranslation from '../../../../intl/useTranslation';
import { projectAddKanbanTask, projectEditKanbanTask } from '../../../../store/actions/projectActions/kanbanActions';
import { Context } from '../KanbanContextWrapper';

import styles from './TaskDialog.module.scss';

const { ipcRenderer } = window.require('electron');

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

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    context.setEditingTask({
      ...context.editingTask,
      [e.target.id]: e.target.value,
    });
  };

  const handleDescriptionChange = (value: string): void => {
    context.setEditingTask({
      ...context.editingTask,
      description: value,
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

    close();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      classes={{ paper: styles.paper }}
    >
      <DialogTitle>
        <IconButton
          className={styles.closeButton}
          onClick={close}
        >
          <CloseIcon />
        </IconButton>

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
            <ReactQuill
              value={context.editingTask?.description ?? ''}
              onChange={handleDescriptionChange}
              theme='bubble'
              placeholder={useTranslation('kanbanDescription')}
              className={styles.descriptionEditor}
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
        {!context.isNewTask && (
          <IconButton
            className={styles.deleteButton}
            onClick={() => ipcRenderer.send('deleteKanbanTask', context.editingTask?.id)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        )}

        <Button onClick={close} variant='outlined' color='primary' size='small'>
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
