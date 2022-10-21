import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ToolbarButtons from '../../../components/elements/ToolbarButtons';
import { createBookmark } from '../../../shared/lib/bookmarks';
import { createTask } from '../../../shared/lib/tasks';

const Toolbar: React.FC = () => {
  const { t } = useTranslation(['bookmarks', 'tasks']);
  const navigate = useNavigate();

  const toolbar = [
    {
      label: t('bookmarks:newBookmark'),
      icon: 'bookmark',
      onClick: () => {
        navigate('/bookmarks');
        createBookmark();
      },
    },
    {
      label: t('tasks:newTask'),
      icon: 'add_task',
      onClick: () => {
        navigate('/tasks');
        createTask();
      },
    },
  ];

  return (
    <ToolbarButtons toolbar={toolbar} />
  );
};

export default Toolbar;
