import React, { useEffect } from 'react';

import TitlebarLayout from '../../components/TitlebarLayout';

// import styles from './Welcome.module.scss';

const Welcome: React.FC = () => {
  useEffect(() => {
    document.title = 'Welcome to InOrdnung';
  }, []);

  return (
    <TitlebarLayout>
      This is the Welcome view
    </TitlebarLayout>
  );
};

export default Welcome;
