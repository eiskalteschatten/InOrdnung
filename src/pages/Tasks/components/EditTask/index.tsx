import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { taskListSelectors, taskSelectors, updateTask } from '../../../../store/entities/project/tasks';

import Input from '../../../../components/elements/Input';
import TextArea from '../../../../components/elements/TextArea';
import Select from '../../../../components/elements/Select';
import { TaskStatus } from '../../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  editingId: string;
}

const EditTask: React.FC<Props> = ({ editingId }) => {
  const { t } = useTranslation(['common', 'tasks']);
  const dispatch = useAppDispatch();
  const toEdit = useAppSelector(state => taskSelectors.selectById(state, editingId));
  const taskLists = useAppSelector(taskListSelectors.selectAll);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <Select
        label={t('common:status')}
        fullWidth
        name='status'
        onChange={handleChange}
        value={toEdit?.status}
      >
        {Object.values(TaskStatus).map(status => (
          <option key={status} value={status}>{t(`tasks:${status}`)}</option>
        ))}
      </Select>

      <Input
        label={t('common:name')}
        fullWidth
        name='name'
        onChange={handleChange}
        value={toEdit?.name ?? ''}
      />

      <TextArea
        label={`${t('common:description')} TODO: markdown`}
        fullWidth
        name='description'
        onChange={handleChange}
        value={toEdit?.description ?? ''}
      />

      <Select
        label={t('tasks:taskLists')}
        fullWidth
        name='taskListId'
        onChange={handleChange}
        value={toEdit?.taskListId}
      >
        {taskLists?.map(taskList => (
          <option key={taskList.id} value={taskList.id}>{taskList.name}</option>
        ))}
      </Select>
    </div>
  );
};

export default EditTask;
