import React, { HTMLAttributes, useState, useEffect } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
  title: string;
  onCollapseChange?: (collapsed?: boolean) => void;
  onLabelContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CollapsibleBox: React.FC<Props> = props => {
  const { className, children, isCollapsed, title, onCollapseChange, onLabelContextMenu, ...leftoverProps } = props;
  const [collapsed, setCollapsed] = useState<boolean | undefined>(isCollapsed);

  useEffect(() => setCollapsed(isCollapsed), [isCollapsed]);
  useEffect(() => onCollapseChange && onCollapseChange(collapsed), [collapsed]);

  return (
    <div
      className={clsx(styles.collapsibleBox, className, {
        [styles.collapsed]: collapsed,
      })}
      {...leftoverProps}
    >
      <div
        className={styles.clickableArea}
        onClick={() => setCollapsed(!collapsed)}
        onContextMenu={onLabelContextMenu}
      >
        <span className='material-icons'>
          {collapsed ? 'chevron_right' : 'expand_more'}
        </span>

        <div className={styles.title}>
          {title}
        </div>
      </div>

      {children}
    </div>
  );
};

export default CollapsibleBox;
