import React from 'react';
// import { useTranslation } from 'react-i18next';

import ToolbarButtons from '../../../components/elements/ToolbarButtons';

const Toolbar: React.FC = () => {
  // const { t } = useTranslation(['']);

  const toolbar = [
    {
      label: 'Test',//t('email:compose'),
      icon: 'create',
      primary: true,
      onClick: () => window.api.send('openEmailComposeWindow'),
    },
  ];

  return (
    <ToolbarButtons toolbar={toolbar} />
  );
};

export default Toolbar;
