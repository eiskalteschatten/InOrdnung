import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setSortingState } from '../../../../store/entities/ui/preferences/tasks';
import { taskListSelectors, updateTask } from '../../../../store/entities/project/tasks';

import { Task, TaskStatus } from '../../../../shared/interfaces/tasks';
import ReactTable from '../../../../components/elements/ReactTable';
import Button from '../../../../components/elements/Button';
import TaskStatusMarker from '../../../../components/elements/TaskStatusMarker';
import RenderMarkdown from '../../../../components/elements/RenderMarkdown';
import { deleteTask, editTask } from '../../../../shared/lib/tasks';
import DueDate from '../DueDate';

import styles from './styles.module.scss';

const columnHelper = createColumnHelper<Task>();

interface Props {
  tasks: Task[];
  showTaskListColumn?: boolean;
}

const TasksTable: React.FC<Props> = ({ tasks, showTaskListColumn }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state);
  const { tasks: tasksUi } = useAppSelector(state => state.ui.preferences);
  const { t } = useTranslation(['common']);
  const [sorting, setSorting] = useState<SortingState>(tasksUi?.sortingState ?? []);
  const [hoverRowId, setHoverRowId] = useState<string | undefined>();
  const { taskListId } = useParams();

  useEffect(() => {
    dispatch(setSortingState(sorting));
  }, [sorting]);

  const filteredTasks = useMemo<Task[]>(() => {
    return tasks.filter(({ status }) => tasksUi.showCompletedTasks ? true : status !== TaskStatus.DONE);
  }, [tasks, tasksUi.showCompletedTasks]);

  const columnVisibility = useMemo<VisibilityState>(() => ({
    taskListId: showTaskListColumn || false,
  }), [showTaskListColumn]);

  const handleRowHover = (row: Row<Task>) => setHoverRowId(row.id);
  const handleRowOut = () => setHoverRowId(undefined);

  const handleRowContextMenu = (row: Row<Task>) => {
    window.api.send('openTaskContextMenu', row.original.id, taskListId);
  };

  const handleMarkTaskAsDone = (id: string, status: TaskStatus) => {
    dispatch(updateTask({
      id,
      changes: {
        status: status === TaskStatus.DONE ? TaskStatus.TODO : TaskStatus.DONE,
      },
    }));
  };

  const columns = useMemo(() => ([
    {
      id: 'checkbox',
      cell: (info: any) => (
        <div
          className={clsx(styles.checkbox, {
            [styles.done]: info.row.original.status === TaskStatus.DONE,
          })}
          onClick={() => handleMarkTaskAsDone(info.row.original.id, info.row.original.status)}
        >
          <span className='material-icons'>
            {info.row.original.status === TaskStatus.DONE ? 'check_circle' : 'circle'}
          </span>
        </div>
      ),
      enableSorting: false,
      size: 20,
    },
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <span>{t(('common:name'))}</span>,
      cell: info => (
        <div className={clsx({ [styles.done]: info.row.original.status === TaskStatus.DONE })}>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: () => <span>{t(('common:description'))}</span>,
      cell: info => (
        <div className={clsx(styles.description, {
          [styles.done]: info.row.original.status === TaskStatus.DONE,
        })}>
          <RenderMarkdown markdownString={info.getValue()} stripMarkdown />
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <span>{t(('common:status'))}</span>,
      cell: info => <TaskStatusMarker status={info.getValue()} />,
    }),
    columnHelper.accessor('dueDate', {
      id: 'dueDate',
      header: () => <span>{t(('tasks:dueDate'))}</span>,
      cell: info => {
        const date = info.getValue();
        return date
          ? (
            <div className={clsx({ [styles.done]: info.row.original.status === TaskStatus.DONE })}>
              <DueDate dueDate={date} />
            </div>
          ) : (<></>);
      },
    }),
    columnHelper.accessor('taskListId', {
      id: 'taskListId',
      header: () => <span>{t(('tasks:taskList'))}</span>,
      cell: info => {
        const taskList = info.getValue() ? taskListSelectors.selectById(state, info.getValue()!) : undefined;

        return taskList ? (
          <Link to={`/tasks/list/${info.getValue()}`}>
            {taskList?.name ? taskList.name : t('common:untitled')}
          </Link>
        ) : '';
      },
    }),
    {
      id: 'buttons',
      cell: (info: any) => (
        <div className={clsx(styles.buttonCell, {
          [styles.visible]: hoverRowId === info.row.id,
        })}>
          <Button onClick={() => editTask(info.row.original.id)}>
            <span className='material-icons'>edit</span>
          </Button>
          <Button onClick={() => deleteTask(info.row.original.id)} deleteButton>
            <span className='material-icons'>delete</span>
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 80,
    },
  ]), [tasks, hoverRowId]);

  return (
    <ReactTable<Task>
      onRowHover={handleRowHover}
      onRowOut={handleRowOut}
      onRowContextMenu={handleRowContextMenu}
      tableData={{
        data: filteredTasks,
        columns,
        state: {
          sorting,
          columnVisibility,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
      }}
    />
  );
};

export default TasksTable;
