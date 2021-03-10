import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import Info from '@material-ui/icons/Info';
import CheckBox from '@material-ui/icons/CheckBox';
import Note from '@material-ui/icons/Note';
import Bookmark from '@material-ui/icons/Bookmark';
import ViewWeek from '@material-ui/icons/ViewWeek';

import useTranslation from '../../../intl/useTranslation';
import { State } from '../../../store';
import SidebarItem, { Props as SidebarItemProp } from './SidebarItem';
import SidebarDragger from './SidebarDragger';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { path } = useRouteMatch();
  const platform = useSelector((state: State) => state.app.platform);
  const savedSidebarWidth = useSelector((state: State) => state.ui.sidebarWidth);
  const projectInfo = useSelector((state: State) => state.project.projectInfo);
  const [sidebarWidth, setSidebarWidth] = useState<number | undefined>(savedSidebarWidth);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSidebarWidth(savedSidebarWidth);
  }, [savedSidebarWidth]);

  const sidebarItems: SidebarItemProp[] = [
    {
      path: '/',
      ItemIcon: Info,
      title: useTranslation('projectInfo'),
    },
    {
      path: '/tasks',
      ItemIcon: CheckBox,
      title: useTranslation('tasks'),
    },
    {
      path: '/quick-notes',
      ItemIcon: Note,
      title: useTranslation('quickNotes'),
    },
    {
      path: '/bookmarks',
      ItemIcon: Bookmark,
      title: useTranslation('bookmarks'),
    },
    {
      path: '/kanban',
      ItemIcon: ViewWeek,
      title: useTranslation('kanbanBoard'),
    },
  ];

  return (
    <div
      className={clsx({
        [styles.sidebar]: true,
        [styles.darwin]: platform === 'darwin',
      })}
      style={{ flex: `0 0 ${sidebarWidth}px` }}
      ref={sidebarRef}
    >
      <div className={styles.projectInfo}>
        {projectInfo.image && (
          <div className={styles.projectImageWrapper}>
            <img src={`data:${projectInfo.image.mimeType};base64,${projectInfo.image.image}`} className={styles.projectImage} />
          </div>
        )}

        {projectInfo.name ? (
          <div className={styles.projectName}>{projectInfo.name}</div>
        ) : (
          <div className={styles.projectName}>
            <FormattedMessage id='menuNewProject' />
          </div>
        )}
      </div>

      <div>
        {sidebarItems.map((item, index: number) => (
          <SidebarItem
            key={index}
            path={`${path}${item.path}`}
            ItemIcon={item.ItemIcon}
            title={item.title}
          />
        ))}

        <SidebarDragger
          sidebarRef={sidebarRef}
          setSidebarWidth={setSidebarWidth}
        />
      </div>
    </div>
  );
};

export default Sidebar;
