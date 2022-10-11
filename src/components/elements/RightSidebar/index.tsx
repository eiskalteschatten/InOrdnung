import React, { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import { setRightSidebarWidth } from '../../../store/entities/ui/preferences';

import ColumnDragger from '../ColumnDragger';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const RightSidebar: React.FC<Props> = ({ children }) => {
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

      {children}
    </div>
  );
};

export default RightSidebar;
