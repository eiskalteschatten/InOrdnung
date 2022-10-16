import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ToolbarButtons from '../../../components/elements/ToolbarButtons';
import { createNewBookmark } from '../../../shared/lib/bookmarks';

const Toolbar: React.FC = () => {
  const { t } = useTranslation(['bookmarks', 'tasks']);
  const navigate = useNavigate();

  const toolbar = [
    {
      label: t('bookmarks:newBookmark'),
      icon: 'bookmark',
      onClick: () => {
        navigate('/bookmarks');
        createNewBookmark();
      },
    },
    {
      label: t('tasks:newTask'),
      icon: 'add_task',
      onClick: () => {
        // navigate('/tasks');
        // createNewBookmark();
      },
    },
  ];

  return (
    <ToolbarButtons toolbar={toolbar} />
  );
};

export default Toolbar;
