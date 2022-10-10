import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store/hooks';
import Toast from '../Toast';

import styles from './styles.module.scss';

const GlobalLoader: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { isLoading } = useAppSelector(state => state.ui);

  if (!isLoading) {
    return null;
  }

  return (
    <Toast hideCloseButton wrapperClassName={styles.loader} className={styles.message}>
      <img src='/loader-reverse-colors.svg' className={styles.spinner} />

      <div>
        {t('common:loading')}
      </div>
    </Toast>
  );
};

export default GlobalLoader;
