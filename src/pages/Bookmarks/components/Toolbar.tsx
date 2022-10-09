import React from 'react';
import { useTranslation } from 'react-i18next';

import ToolbarButtons from '../../../components/elements/ToolbarButtons';

const Toolbar: React.FC = () => {
  const { t } = useTranslation(['common']);

  const toolbar = [
    {
      label: t('common:new'),
      icon: 'bookmark',
      primary: true,
      onClick: () => console.log('new bookmark'),
    },
  ];

  return (
    <ToolbarButtons toolbar={toolbar} />
  );
};

export default Toolbar;
