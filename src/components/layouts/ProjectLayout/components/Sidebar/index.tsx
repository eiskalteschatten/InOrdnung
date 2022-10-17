import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../../store/hooks';
import { setSidebarWidth } from '../../../../../store/entities/ui/preferences/general';

import ColumnDragger from '../../../../elements/ColumnDragger';

import SidebarButton from './components/SidebarButton';
import SidebarSpacer from './components/SidebarSpacer';
import Tasks from './components/Tasks';

import styles from './styles.module.scss';

const Sidebar: React.FC = () => {
  const savedWidth = useAppSelector(state => state.ui.preferences.general.sidebarWidth);
  const [width, setWidth] = useState<number>(savedWidth);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation(['projectInfo', 'bookmarks']);

  useEffect(() => {
    setWidth(savedWidth);
  }, [savedWidth]);

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
        <Tasks />
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
