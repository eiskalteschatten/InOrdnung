import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Info from '@material-ui/icons/Info';
import CheckBox from '@material-ui/icons/CheckBox';
import Note from '@material-ui/icons/Note';
import Bookmark from '@material-ui/icons/Bookmark';

import useTranslation from '../../../intl/useTranslation';
import { State } from '../../../store';
import SidebarItem, { Props as SidebarItemProp } from './SidebarItem';
import SidebarDragger from './SidebarDragger';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { path } = useRouteMatch();
  const savedSidebarWidth = useSelector((state: State) => state.ui.sidebarWidth);
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
  ];

  return (
    <div
      className={styles.sidebar}
      style={{ width: sidebarWidth }}
      ref={sidebarRef}
    >
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
  );
};

export default Sidebar;
