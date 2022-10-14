import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { bookmarkSelectors, updateBookmark } from '../../../../store/entities/project/bookmarks';

import Input from '../../../../components/elements/Input';

import styles from './styles.module.scss';

interface Props {
  editingId: string;
}

const EditBookmark: React.FC<Props> = ({ editingId }) => {
  const { t } = useTranslation(['bookmarks']);
  const dispatch = useAppDispatch();
  const state  = useAppSelector(state => state);
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (editingId) {
      const bookmarkToEdit = bookmarkSelectors.selectById(state, editingId);
      setName(bookmarkToEdit?.name || '');
      setUrl(bookmarkToEdit?.url || '');
    }
  }, [editingId]);

  useEffect(() => {
    if (editingId) {
      dispatch(updateBookmark({
        id: editingId,
        changes: { name, url },
      }));
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
