import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { taskSelectors, updateTask } from '../../../../store/entities/project/tasks';

import Input from '../../../../components/elements/Input';
import TextArea from '../../../../components/elements/TextArea';

import styles from './styles.module.scss';

interface Props {
  editingId: string;
}

const EditTask: React.FC<Props> = ({ editingId }) => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const toEdit = useAppSelector(state => taskSelectors.selectById(state, editingId));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingId) {
      dispatch(updateTask({
        id: editingId,
        changes: {
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  return (
    <div className={styles.editTask}>
      <Input
        label={t('common:name')}
        fullWidth
        name='name'
        onChange={handleChange}
        value={toEdit?.name ?? ''}
      />

      <TextArea
        label={t('common:description')}
        fullWidth
        name='description'
        onChange={handleChange}
        value={toEdit?.description ?? ''}
      />
    </div>
  );
};

export default EditTask;
