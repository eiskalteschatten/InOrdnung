import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addCollapsedSidebarId, removeCollapsedSidebarId, setSidebarWidth } from '../../../../../store/entities/ui/preferences';
import { taskListSelectors } from '../../../../../store/entities/project/tasks';

import { TaskViewType } from '../../../../../shared/interfaces/tasks';

import CollapsibleBox from '../../../../elements/CollapsibleBox';
import ColumnDragger from '../../../../elements/ColumnDragger';
import SidebarButton from '../../../../elements/SidebarButton';
import SidebarSpacer from '../../../../elements/SidebarSpacer';

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

  // TODO
  // const handleAccountContextMenu = (account: Account) => {
  //   window.api.send('openEmailSidebarAccountContextMenu', account);
  // };

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
          // onLabelContextMenu={() => handleAccountContextMenu(account)}
        >
          {/* TODO: context menus */}
          {taskLists?.map(list => (
            <SidebarButton
              to='/'
              icon={
                list.view === TaskViewType.LIST
                  ? <span className='material-icons'>checklist</span>
                  : <span className='material-icons'>view_column</span>
              }
              end
              key={list.id}
            >
              {list.name}
            </SidebarButton>
          ))}
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
