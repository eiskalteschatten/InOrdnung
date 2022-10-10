import React from 'react';
import { useTranslation } from 'react-i18next';

import Toast from '../Toast';
import Spinner from '../Spinner';

import styles from './styles.module.scss';

const GlobalLoader: React.FC = () => {
  const { t } = useTranslation(['common']);

  return (
    <Toast hideCloseButton className={styles.loader}>
      <Spinner small />{t('common:loading')}
    </Toast>
  );
};

export default GlobalLoader;
