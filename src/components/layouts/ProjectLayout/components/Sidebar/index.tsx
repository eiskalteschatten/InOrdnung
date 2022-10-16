import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addCollapsedSidebarId, removeCollapsedSidebarId, setSidebarWidth } from '../../../../../store/entities/ui/preferences';
import { taskListSelectors } from '../../../../../store/entities/project/tasks';

import { TaskViewType } from '../../../../../shared/interfaces/tasks';
import { createTaskList } from '../../../../../shared/lib/tasks';

import CollapsibleBox from './components/CollapsibleBox';
import SidebarButton from './components/SidebarButton';
import SidebarSpacer from './components/SidebarSpacer';
import CollapsibleBoxAddButton from './components/CollapsibleBoxAddButton';

import ColumnDragger from '../../../../elements/ColumnDragger';

import styles from './styles.module.scss';

enum CollapsibleBoxIds {
  TASKS = 'tasks',
}

const Sidebar: React.FC = () => {
  const savedWidth = useAppSelector(state => state.ui.preferences.sidebarWidth);
  const collapsedIds = useAppSelector(state => state.ui.preferences.collapsedSidebarIds);
  const taskLists = useAppSelector(taskListSelectors.selectAll);
  const [width, setWidth] = useState<number>(savedWidth);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation(['projectInfo', 'bookmarks', 'tasks']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setWidth(savedWidth);
  }, [savedWidth]);

  const handleCollapseChange = (id: string, collapsed?: boolean) => {
    collapsed
      ? dispatch(addCollapsedSidebarId(id))
      : dispatch(removeCollapsedSidebarId(id));
  };

  return (
    <div
      className={styles.sidebar}
      style={{ flex: `0 0 ${width}px` }}
      ref={columnRef}
    >
      <div className={styles.contents}>
        <SidebarButton
          to='/'
          icon={<span className='material-icons'>info</span>}
          end
        >
          {t('projectInfo:projectInfo')}
        </SidebarButton>

        <SidebarButton
          to='/bookmarks'
          icon={<span className='material-icons'>bookmark</span>}
        >
          {t('bookmarks:bookmarks')}
        </SidebarButton>

        <SidebarSpacer />

        <CollapsibleBox
          title={t('tasks:tasks')}
          onCollapseChange={(collapsed?: boolean) => handleCollapseChange(CollapsibleBoxIds.TASKS, collapsed)}
          isCollapsed={collapsedIds.includes(CollapsibleBoxIds.TASKS)}
        >
          {/* TODO: context menus */}
          {taskLists?.map(list => (
            <SidebarButton
              to={`/tasks/list/${list.id}`}
              icon={
                list.view === TaskViewType.LIST
                  ? <span className='material-icons'>checklist</span>
                  : <span className='material-icons'>view_column</span>
              }
              key={list.id}
            >
              {list.name}
            </SidebarButton>
          ))}

          <CollapsibleBoxAddButton onClick={() => createTaskList()}>
            <span className='material-icons'>add</span>{t('tasks:newTaskList')}
          </CollapsibleBoxAddButton>
        </CollapsibleBox>
      </div>

      <ColumnDragger
        columnRef={columnRef}
        setWidth={setWidth}
        setStoreWidth={setSidebarWidth}
      />
    </div>
  );
};

export default Sidebar;
