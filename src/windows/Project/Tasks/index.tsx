import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { IpcRendererEvent } from 'electron';
import clsx from 'clsx';
import moment from 'moment';

import {
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { State } from '../../../store';
import { uiSetOpenEditTaskDialog, uiSetTasksSortingOptions } from '../../../store/actions/uiActions';
import { Task } from '../../../interfaces/tasks';
import { getDateLocaleFormat } from '../../../lib/dates';
import { sortStrings } from '../../../lib/helper';
import TaskDialog from './TaskDialog';

import styles from './Tasks.module.scss';

const { ipcRenderer } = window.require('electron');

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: State) => state.project?.tasks);
  const sortBy = useSelector((state: State) => state.ui.tasksSortingOptions.sortBy);
  const sortDirection = useSelector((state: State) => state.ui.tasksSortingOptions.sortDirection);
  const openEditTaskDialog = useSelector((state: State) => state.ui.openEditTaskDialog);
  const [localTasks, setLocalTasks] = useState<Task[]>();
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [hoverTaskId, setHoverTaskId] = useState<string>('');

  useEffect(() => {
    ipcRenderer.on('editTask', (e: IpcRendererEvent, task: Task): void => {
      setEditingTask(task);
      dispatch(uiSetOpenEditTaskDialog(true));
    });

    return () => {
      ipcRenderer.removeAllListeners('editTask');
    };
  }, []);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleSort = (newSortBy: string): void => {
    let newSortDirection = sortDirection;

    const sortOptions = {
      sortBy: newSortBy,
      sortDirection,
    };

    if (sortBy === newSortBy) {
      newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      sortOptions.sortDirection = newSortDirection;
    }

    dispatch(uiSetTasksSortingOptions(sortOptions));

    setLocalTasks(localTasks?.sort((rowA: any, rowB: any) => {
      if (newSortBy === 'dueDate') {
        const getTime = (date?: string): number => date ? new Date(date).getTime() : 0;
        const dateA = getTime(rowA.dueDate);
        const dateB = getTime(rowB.dueDate);
        return newSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      else {
        return sortStrings(rowA[newSortBy], rowB[newSortBy], newSortDirection);
      }
    }));
  };

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

      <div className={styles.tableWrapper}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortDirection}
                    onClick={() => handleSort('name')}
                  >
                    <FormattedMessage id='tasksName' />
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'note'}
                    direction={sortDirection}
                    onClick={() => handleSort('note')}
                  >
                    <FormattedMessage id='tasksNote' />
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'dueDate'}
                    direction={sortDirection}
                    onClick={() => handleSort('dueDate')}
                  >
                    <FormattedMessage id='tasksDueDate' />
                  </TableSortLabel>
                </TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(localTasks) && localTasks.map((row: any, index: number) => (
                <TableRow
                  key={index}
                  onMouseEnter={() => setHoverTaskId(row.id)}
                  onMouseLeave={() => setHoverTaskId('')}
                  onContextMenu={() => ipcRenderer.send('showTaskMenu', row)}
                >
                  <TableCell width={35}>
                    <IconButton
                      size='small'
                      onClick={() => console.log('complete!')}
                    >
                      {row.completed ? (
                        <CheckBoxIcon fontSize='small' />
                      ) : (
                        <CheckBoxOutlineBlankIcon fontSize='small' />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component='th' scope='row'  className={styles.tableCell}>
                    {row.name}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.note}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.hasDueDate && (
                      <>{moment(row.dueDate).format(getDateLocaleFormat())}</>
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      size='small'
                      onClick={() => ipcRenderer.send('showTaskMenu', row)}
                      className={clsx({
                        [styles.invisible]: hoverTaskId !== row.id,
                      })}
                    >
                      <MoreVertIcon fontSize='small' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TaskDialog
        open={openEditTaskDialog}
        close={() => dispatch(uiSetOpenEditTaskDialog(false))}
        task={editingTask}
      />
    </div>
  );
};

export default Tasks;
