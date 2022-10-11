import React from 'react';
import { useTranslation } from 'react-i18next';

import Input from '../../../../components/elements/Input';

import styles from './styles.module.scss';

const EditBookmark: React.FC = () => {
  const { t } = useTranslation(['bookmarks']);

  // if (!editing) {
  //   return null;
  // }

  return (
    <div className={styles.editBookmark}>
      <Input
        label={t('bookmarks:name')}
        fullWidth
      />

      <Input
        label={t('bookmarks:url')}
        fullWidth
        placeholder='https://...'
      />
    </div>
  );
};

export default EditBookmark;
