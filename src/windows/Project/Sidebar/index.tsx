import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Info from '@material-ui/icons/Info';
import CheckBox from '@material-ui/icons/CheckBox';
import Bookmark from '@material-ui/icons/Bookmark';

import useTranslation from '../../../intl/useTranslation';
import SidebarItem, { Props as SidebarItemProp } from './SidebarItem';
import SidebarDragger from './SidebarDragger';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { path } = useRouteMatch();

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
      path: '/bookmarks',
      ItemIcon: Bookmark,
      title: useTranslation('bookmarks'),
    },
  ];

  return (
    <div className={styles.sidebar}>
      {sidebarItems.map((item, index: number) => (
        <SidebarItem
          key={index}
          path={`${path}${item.path}`}
          ItemIcon={item.ItemIcon}
          title={item.title}
        />
      ))}

      <SidebarDragger />
    </div>
  );
};

export default Sidebar;
