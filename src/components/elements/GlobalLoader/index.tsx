import React from 'react';
import { useTranslation } from 'react-i18next';

import Toast from '../Toast';

import styles from './styles.module.scss';

const GlobalLoader: React.FC = () => {
  const { t } = useTranslation(['common']);

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
