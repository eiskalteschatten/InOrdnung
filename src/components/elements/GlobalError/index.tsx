import React from 'react';

import { useAppSelector } from '../../../store/hooks';
import Toast from '../Toast';

const GlobalError: React.FC = () => {
  const { globalError } = useAppSelector(state => state.ui.session);

  if (!globalError) {
    return null;
  }

  return (
    <Toast type='error'>
      {globalError}
    </Toast>
  );
};

export default GlobalError;
