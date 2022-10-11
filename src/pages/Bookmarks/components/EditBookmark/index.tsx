import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { bookmarksAdapter, setEditingBookmark } from '../../../../store/entities/project/bookmarks';

import Input from '../../../../components/elements/Input';

import styles from './styles.module.scss';

const EditBookmark: React.FC = () => {
  const { t } = useTranslation(['bookmarks']);
  const dispatch = useAppDispatch();
  const { bookmarks } = useAppSelector(state => state.project);
  const { editing } = bookmarks;
  const [name, setName] = useState<string>(editing?.name || '');
  const [url, setUrl] = useState<string>(editing?.url || '');

  useEffect(() => {
    if (editing) {
      dispatch(setEditingBookmark({
        ...editing,
        name,
        url,
      }));

      bookmarksAdapter.updateOne(bookmarks.data, {
        id: editing.id,
        changes: { name, url },
      });
    }
  }, [name, url]);

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
