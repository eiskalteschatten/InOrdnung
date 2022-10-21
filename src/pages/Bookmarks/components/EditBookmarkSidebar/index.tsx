import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { bookmarkSelectors, updateBookmark } from '../../../../store/entities/project/bookmarks';

import Input from '../../../../components/elements/Input';
import RightSidebarCenterButton from '../../../../components/elements/RightSidebarCenterButton';
import Button from '../../../../components/elements/Button';

import styles from './styles.module.scss';
import { deleteBookmark } from '../../../../shared/lib/bookmarks';

interface Props {
  editingId: string;
}

const EditBookmarkSidebar: React.FC<Props> = ({ editingId }) => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const toEdit = useAppSelector(state => bookmarkSelectors.selectById(state, editingId));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingId) {
      dispatch(updateBookmark({
        id: editingId,
        changes: {
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  return (
    <div className={styles.editBookmark}>
      <Input
        label={t('common:name')}
        fullWidth
        name='name'
        onChange={handleChange}
        value={toEdit?.name ?? ''}
      />

      <Input
        label={t('common:url')}
        fullWidth
        placeholder='https://...'
        name='url'
        onChange={handleChange}
        value={toEdit?.url ?? ''}
      />

      <RightSidebarCenterButton>
        <Button
          className={styles.deleteButton}
          onClick={() => deleteBookmark(editingId)}
          icon={<span className='material-icons'>delete</span>}
          deleteButton
        >
          {t('bookmarks:deleteBookmark')}
        </Button>
      </RightSidebarCenterButton>
    </div>
  );
};

export default EditBookmarkSidebar;
