import React, { useEffect, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown/with-html';

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
import EditIcon from '@material-ui/icons/Edit';

import useTranslation from '../../../../intl/useTranslation';
import { projectAddKanbanTask, projectEditKanbanTask } from '../../../../store/actions/projectActions/kanbanActions';
import QuillEditor from '../../../../components/QuillEditor';
import RoundedButton from '../../../../components/RoundedButton';
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
  const [editingDescription, setEditingDescription] = useState<boolean>(false);

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

  const handleClose = (): void => {
    setEditingDescription(false);
    close();
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
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>
        <IconButton
          className={styles.closeButton}
          onClick={handleClose}
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
        <Grid container>
          <Grid item xs={9} className={styles.leftSide}>
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
              onClick={() => setEditingDescription(false)}
            />

            <div className={styles.descriptionHeader}>
              <span className={styles.descriptionLabel}>
                <FormattedMessage id='kanbanDescription' />
              </span>

              {editingDescription ? (
                <RoundedButton
                  onClick={() => setEditingDescription(false)}
                  className={styles.descriptionEditButton}
                  size='small'
                >
                  <CloseIcon fontSize='small' />&nbsp;<FormattedMessage id='kanbanCloseEditor' />
                </RoundedButton>
              ) : (
                <RoundedButton
                  onClick={() => setEditingDescription(true)}
                  className={styles.descriptionEditButton}
                  size='small'
                >
                  <EditIcon fontSize='small' />&nbsp;<FormattedMessage id='kanbanEditDescription' />
                </RoundedButton>
              )}
            </div>

            {editingDescription ? (
              <QuillEditor
                value={context.editingTask?.description ?? ''}
                onChange={handleDescriptionChange}
                placeholder={`${useTranslation('kanbanDescription')}...`}
                className={styles.descriptionEditor}
              />
            ) : (
              <div onDoubleClick={() => setEditingDescription(true)}>
                <ReactMarkdown
                  source={context.editingTask?.description ?? ''}
                  escapeHtml={false}
                />
              </div>
            )}
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
