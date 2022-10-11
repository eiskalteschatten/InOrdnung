import React from 'react';
import { useTranslation } from 'react-i18next';

import ToolbarButtons from '../../../components/elements/ToolbarButtons';
import { createNewBookmark } from '../../../shared/lib/bookmarks';

const Toolbar: React.FC = () => {
  const { t } = useTranslation(['bookmarks']);

  const toolbar = [
    {
      label: t('bookmarks:newBookmark'),
      icon: 'bookmark',
      primary: true,
      onClick: () => createNewBookmark(),
    },
  ];

  return (
    <ToolbarButtons toolbar={toolbar} />
  );
};

export default Toolbar;
