import React, { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import { setRightSidebarWidth } from '../../../store/entities/ui/preferences/general';

import ColumnDragger from '../ColumnDragger';
import Button from '../Button';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
  handleClose?: () => void;
}

const RightSidebar: React.FC<Props> = ({ children, title, handleClose }) => {
  const savedWidth = useAppSelector(state => state.ui.preferences.general.rightSidebarWidth);
  const [width, setWidth] = useState<number>(savedWidth);
  const columnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(savedWidth);
  }, [savedWidth]);

  const sendColumnResizeEvent = () => {
    const resizeEvent = new CustomEvent('resizeRightSidebar', { detail: width });
    window.dispatchEvent(resizeEvent);
  };

  return (
    <div
      className={styles.rightSidebar}
      style={{ flex: `0 0 ${width}px`, width }}
      ref={columnRef}
    >
      <ColumnDragger
        columnRef={columnRef}
        setWidth={setWidth}
        setStoreWidth={setRightSidebarWidth}
        draggerOnLeft
        onColumnResize={sendColumnResizeEvent}
      />

      <div className={styles.contentWrapper}>
        <div className={styles.toolbar}>
          <div className={styles.title}>
            {title}
          </div>

          {handleClose && (
            <Button onClick={handleClose}>
              <span className='material-icons'>close</span>
            </Button>
          )}
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
