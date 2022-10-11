import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setEditingBookmark } from '../../../../store/entities/project/bookmarks';

import Input from '../../../../components/elements/Input';

import styles from './styles.module.scss';

const EditBookmark: React.FC = () => {
  const { t } = useTranslation(['bookmarks']);
  const { editing } = useAppSelector(state => state.project.bookmarks);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>(editing?.name || '');
  const [url, setUrl] = useState<string>(editing?.url || '');

  useEffect(() => {
    if (editing) {
      dispatch(setEditingBookmark({
        ...editing,
        name,
        url,
      }));
    }
  }, [editing, name, url]);

  return (
    <div className={styles.editBookmark}>
      <Input
        label={t('bookmarks:name')}
        fullWidth
        name='name'
        onChange={e => setName(e.target.value)}
        value={name}
      />

      <Input
        label={t('bookmarks:url')}
        fullWidth
        placeholder='https://...'
        name='url'
        onChange={e => setUrl(e.target.value)}
        value={url}
      />
    </div>
  );
};

export default EditBookmark;
