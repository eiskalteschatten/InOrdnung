import React from 'react';

import PopupBase from '../PopupBase';

import styles from './styles.module.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const ToolbarDropdown: React.FC<Props> = ({ open, handleClose, children }) => {
  if (!open) {
    return null;
  }

  return (
    <PopupBase
      className={styles.dropdown}
      open={open}
      handleClose={handleClose}
    >
      {children}
    </PopupBase>
  );
};

export default ToolbarDropdown;
