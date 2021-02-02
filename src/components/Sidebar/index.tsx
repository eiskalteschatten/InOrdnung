import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import useTranslation from '../../intl/useTranslation';
import SidebarItem, { Props as SidebarItemProp } from './SidebarItem';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { path } = useRouteMatch();

  const sidebarItems: SidebarItemProp[] = [{
    path: '/',
    iconClass: 'bi-info-circle',
    title: useTranslation('projectInfo'),
  }];

  return (
    <div className={styles.sidebar}>
      {sidebarItems.map((item, index: number) => (
        <SidebarItem
          key={index}
          path={`${path}${item.path}`}
          iconClass={item.iconClass}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default Sidebar;
