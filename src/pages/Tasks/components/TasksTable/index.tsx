import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setTasksSortingState } from '../../../../store/entities/ui/preferences';

import { Task } from '../../../../shared/interfaces/tasks';
import ReactTable from '../../../../components/elements/ReactTable';
import Button from '../../../../components/elements/Button';

import styles from './styles.module.scss';

const columnHelper = createColumnHelper<Task>();

interface Props {
  tasks: Task[];
  showTaskListColumn?: boolean;
}

const TasksTable: React.FC<Props> = ({ tasks, showTaskListColumn }) => {
  const dispatch = useAppDispatch();
  const { tasks: tasksUi } = useAppSelector(state => state.ui.preferences);
  const { t } = useTranslation(['common']);
  const [sorting, setSorting] = useState<SortingState>(tasksUi?.sortingState ?? []);
  const [hoverRowId, setHoverRowId] = useState<string | undefined>();

  useEffect(() => {
    dispatch(setTasksSortingState(sorting));
  }, [sorting]);

  const columnVisibility = useMemo<VisibilityState>(() => ({
    taskListId: showTaskListColumn || false,
  }), [showTaskListColumn]);

  const handleRowHover = (row: Row<Task>) => {
    setHoverRowId(row.id);
  };

  const handleRowOut = () => {
    setHoverRowId(undefined);
  };

  // TODO
  // const handleRowContextMenu = (row: Row<Task>) => {
  //   window.api.send('openTaskContextMenu', row.original.id);
  // };

  const columns = useMemo(() => ([
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <span>{t(('common:name'))}</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: () => <span>{t(('common:description'))}</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <span>{t(('common:status'))}</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('taskListId', {
      id: 'taskListId',
      header: () => <span>{t(('tasks:taskList'))}</span>,
      cell: info => info.getValue(),
    }),
    {
      id: 'buttons',
      cell: (info: any) => (
        <div className={clsx(styles.buttonCell, {
          [styles.visible]: hoverRowId === info.row.id,
        })}>
          <Button /*onClick={() => editBookmark(info.row.original.id)}*/>
            <span className='material-icons'>edit</span>
          </Button>
          <Button /*onClick={() => deleteBookmark(info.row.original.id)}*/>
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
      // TODO
      // onRowContextMenu={handleRowContextMenu}
      tableData={{
        data: tasks,
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
