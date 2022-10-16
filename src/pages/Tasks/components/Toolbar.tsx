import React from 'react';
import { useTranslation } from 'react-i18next';

import ToolbarButtons from '../../../components/elements/ToolbarButtons';
import { createTask } from '../../../shared/lib/tasks';

const Toolbar: React.FC = () => {
  const { t } = useTranslation(['tasks']);

  const toolbar = [
    {
      label: t('tasks:newTask'),
      icon: 'add_task',
      primary: true,
      onClick: () => createTask(),
    },
  ];

  return (
    <ToolbarButtons toolbar={toolbar} />
  );
};

export default Toolbar;
