import React, { useState } from 'react';
import clsx from 'clsx';

import { ToolbarConfig } from '../../../shared/interfaces/Toolbars';
import Button from '../Button';
import ToolbarDropdown from '../ToolbarDropdown';

import styles from './styles.module.scss';

interface ToolbarButtonProps {
  button: ToolbarConfig;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ button }) => {
  const { primary, label, icon, dropdown, onClick, className, ...leftovers } = button;
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className={styles.button}>
      <Button
        primary={primary}
        icon={<span className='material-icons'>{icon}</span>}
        iconRight={dropdown && <span className={clsx('material-icons', styles.dropdownIcon)}>expand_more</span>}
        onClick={dropdown ? () => setDropdownOpen(!dropdownOpen) : onClick}
        className={clsx(className, {
          [styles.dropdownOpen]: dropdownOpen,
        })}
        {...leftovers}
      >
        {label}
      </Button>

      {dropdown && (
        <ToolbarDropdown
          open={dropdownOpen}
          handleClose={() => setDropdownOpen(false)}
        >
          {dropdown}
        </ToolbarDropdown>
      )}
    </div>
  );
};

interface Props {
  toolbar: ToolbarConfig[];
}

const ToolbarButtons: React.FC<Props> = ({ toolbar }) => {
  return (
    <>
      {toolbar.map((button: ToolbarConfig, index: number) => (
        <ToolbarButton button={button} key={index} />
      ))}
    </>
  );
};

export default ToolbarButtons;
