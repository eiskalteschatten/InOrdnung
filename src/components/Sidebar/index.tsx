import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Info from '@material-ui/icons/Info';

import useTranslation from '../../intl/useTranslation';
import SidebarItem, { Props as SidebarItemProp } from './SidebarItem';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { path } = useRouteMatch();

  const sidebarItems: SidebarItemProp[] = [{
    path: '/',
    ItemIcon: Info,
    title: useTranslation('projectInfo'),
  }];

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
    </div>
  );
};

export default Sidebar;
