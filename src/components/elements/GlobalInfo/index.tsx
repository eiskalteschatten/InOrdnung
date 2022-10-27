import React from 'react';

import { useAppSelector } from '../../../store/hooks';
import Toast from '../Toast';

const GlobalInfo: React.FC = () => {
  const { globalInfo } = useAppSelector(state => state.ui.session);

  if (!globalInfo) {
    return null;
  }

  return (
    <Toast>
      {globalInfo}
    </Toast>
  );
};

export default GlobalInfo;
