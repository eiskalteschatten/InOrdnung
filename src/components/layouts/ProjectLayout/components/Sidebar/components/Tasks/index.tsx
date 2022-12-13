import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../../../../store/hooks';
import { setListEditingId, taskListSelectors, updateTaskList } from '../../../../../../../store/entities/project/tasks';

import { TaskListViewType } from '../../../../../../../shared/interfaces/tasks';
import { createTaskList } from '../../../../../../../shared/lib/tasks';

import Input from '../../../../../../elements/Input';

import CollapsibleBox from '../CollapsibleBox';
import CollapsibleBoxAddButton from '../CollapsibleBoxAddButton';
import SidebarButton from '../SidebarButton';

import { CollapsibleBoxIds } from '../../config';
import { useCollapsibleBoxHelper } from '../../hooks';

const Tasks: React.FC = () => {
  const { t } = useTranslation(['tasks']);
  const dispatch = useAppDispatch();
  const collapsedIds = useAppSelector(state => state.ui.preferences.general.collapsedSidebarIds);
  const { listEditingId } = useAppSelector(state => state.project.tasks);
  const taskLists = useAppSelector(taskListSelectors.selectAll);
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleCollapseChange } = useCollapsibleBoxHelper();

  useEffect(() => {
    if (listEditingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [listEditingId]);

  const handleTaskListContextMenu = (id: string) => window.api.send('openTaskListContextMenu', id);

  const handleRenameTaskListChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    dispatch(updateTaskList({
      id,
      changes: {
        name: e.target.value,
      },
    }));
  };

  return (
    <CollapsibleBox
      title={t('tasks:tasks')}
      onCollapseChange={(collapsed?: boolean) => handleCollapseChange(CollapsibleBoxIds.TASKS, collapsed)}
      isCollapsed={collapsedIds.includes(CollapsibleBoxIds.TASKS)}
    >
      <SidebarButton
        to='/tasks'
        icon={<span className='material-icons'>task_alt</span>}
        end
      >
        {t('tasks:allTasks')}
      </SidebarButton>

      {taskLists?.map(list => (
        <SidebarButton
          to={`/tasks/list/${list.id}`}
          icon={
            list.view === TaskListViewType.LIST
              ? <span className='material-icons'>checklist</span>
              : <span className='material-icons'>view_column</span>
          }
          key={list.id}
          onContextMenu={() => handleTaskListContextMenu(list.id)}
        >
          {listEditingId === list.id ? (
            <Input
              value={list.name}
              onChange={e => handleRenameTaskListChange(e, list.id)}
              onBlur={() => dispatch(setListEditingId())}
              onKeyDown={e => e.key === 'Enter' && dispatch(setListEditingId())}
              ref={inputRef}
            />
          ) : (
            <>{list.name}</>
          )}
        </SidebarButton>
      ))}

      <SidebarButton
        to='/tasks/archive'
        icon={<span className='material-icons'>inventory_2</span>}
        end
      >
        {t('tasks:taskArchive')}
      </SidebarButton>

      <CollapsibleBoxAddButton onClick={() => createTaskList()}>
        <span className='material-icons'>add</span>{t('tasks:newTaskList')}
      </CollapsibleBoxAddButton>
    </CollapsibleBox>
  );
};

export default Tasks;
