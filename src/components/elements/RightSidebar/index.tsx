import React, { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import { setRightSidebarWidth } from '../../../store/entities/ui/preferences';

import ColumnDragger from '../ColumnDragger';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
  hideCloseButton?: boolean;
}

const RightSidebar: React.FC<Props> = ({ children, title, hideCloseButton }) => {
  const savedWidth = useAppSelector(state => state.ui.preferences.rightSidebarWidth);
  const [width, setWidth] = useState<number>(savedWidth);
  const columnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(savedWidth);
  }, [savedWidth]);

  return (
    <div
      className={styles.rightSidebar}
      style={{ flex: `0 0 ${width}px` }}
      ref={columnRef}
    >
      <ColumnDragger
        columnRef={columnRef}
        setWidth={setWidth}
        setStoreWidth={setRightSidebarWidth}
        draggerOnLeft
      />

      <div className={styles.contentWrapper}>
        <div className={styles.toolbar}>
          <div className={styles.title}>
            {title}
          </div>
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
