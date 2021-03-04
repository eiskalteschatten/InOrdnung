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
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DoneIcon from '@material-ui/icons/Done';

import { State } from '../../../store';
import { uiSetShowCompletedTasks, uiSetTasksSortingOptions } from '../../../store/actions/uiActions';
import { uiSetOpenEditTaskDialog } from '../../../store/actions/uiTempActions';
import { projectEditTask } from '../../../store/actions/projectActions/taskActions';
import { Task } from '../../../interfaces/tasks';
import { getDateLocaleFormat } from '../../../lib/dates';
import useTranslation from '../../../intl/useTranslation';
import { sortBooleans, sortStrings } from '../../../lib/helper';
import TaskDialog from './TaskDialog';

import styles from './Tasks.module.scss';

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: State) => state.project?.tasks);
  const sortBy = useSelector((state: State) => state.ui.tasksSortingOptions.sortBy);
  const sortDirection = useSelector((state: State) => state.ui.tasksSortingOptions.sortDirection);
  const openEditTaskDialog = useSelector((state: State) => state.uiTemp.openEditTaskDialog);
  const showCompletedTasks = useSelector((state: State) => state.ui.showCompletedTasks);
  const [localTasks, setLocalTasks] = useState<Task[]>();
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [hoverTaskId, setHoverTaskId] = useState<string>('');

  useEffect(() => {
    window.api.on('editTask', (e: IpcRendererEvent, task: Task): void => {
      setEditingTask(task);
    });

    return () => {
      window.api.removeAllListeners('editTask');
    };
  }, []);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (editingTask) {
      dispatch(uiSetOpenEditTaskDialog(true));
    }
  }, [editingTask]);

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
        const getTime = (date?: string, hasDueDate = false): number => date && hasDueDate ? new Date(date).getTime() : 0;
        const dateA = getTime(rowA.dueDate, rowA.hasDueDate);
        const dateB = getTime(rowB.dueDate, rowA.hasDueDate);
        return newSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      else if (newSortBy === 'completed') {
        return sortBooleans(rowA.completed, rowB.completed, newSortDirection);
      }
      else {
        return sortStrings(rowA[newSortBy], rowB[newSortBy], newSortDirection);
      }
    }));
  };

  const handleToggleCompleted = (task: Task): void => {
    dispatch(projectEditTask({
      ...task,
      completed: !task.completed,
    }));
  };

  const handleShowHideCompletedTasks = (): void => {
    dispatch(uiSetShowCompletedTasks(!showCompletedTasks));
  };

  const handleDoubleClick = (task: Task): void => {
    setEditingTask(task);
  };

  const handleCloseDialog = (): void => {
    setEditingTask(undefined);
    dispatch(uiSetOpenEditTaskDialog(false));
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <FormControlLabel
          control={
            <Switch
              checked={showCompletedTasks}
              onChange={handleShowHideCompletedTasks}
              id='hasDueDate'
              size='small'
              color='primary'
            />
          }
          label={<div className={styles.showCompletedTasks}>{useTranslation('tasksShowCompletedTasks')}</div>}
          className={styles.showCompletedTasksSwitch}
        />

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
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'completed'}
                    direction={sortDirection}
                    onClick={() => handleSort('completed')}
                  >
                    <DoneIcon fontSize='small' />
                  </TableSortLabel>
                </TableCell>
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
              {Array.isArray(localTasks) && localTasks.map((row: any) => (
                <TableRow
                  key={row.id}
                  onMouseEnter={() => setHoverTaskId(row.id)}
                  onMouseLeave={() => setHoverTaskId('')}
                  onContextMenu={() => window.api.send('showTaskMenu', row)}
                  className={clsx({
                    [styles.completedTask]: row.completed,
                    [styles.hiddenTask]: !showCompletedTasks && row.completed,
                  })}
                  onDoubleClick={() => handleDoubleClick(row)}
                >
                  <TableCell width={35}>
                    <IconButton
                      size='small'
                      onClick={() => handleToggleCompleted(row)}
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
                      onClick={() => window.api.send('showTaskMenu', row)}
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

      {openEditTaskDialog && (
        <TaskDialog
          open={openEditTaskDialog}
          handleClose={handleCloseDialog}
          task={editingTask}
        />
      )}
    </div>
  );
};

export default Tasks;
