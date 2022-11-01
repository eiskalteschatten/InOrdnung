import React, { Suspense }  from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { taskListSelectors, taskSelectors, updateTask } from '../../../../store/entities/project/tasks';

import Input from '../../../../components/elements/Input';
import Select from '../../../../components/elements/Select';
import { TaskStatus } from '../../../../shared/interfaces/tasks';
import Button from '../../../../components/elements/Button';
import RightSidebarCenterButton from '../../../../components/elements/RightSidebarCenterButton';
import SuspeseLoader from '../../../../components/elements/SuspenseLoader';
import { deleteTask } from '../../../../shared/lib/tasks';

import styles from './styles.module.scss';

const MarkdownEditor = React.lazy(() => import('../../../../components/elements/MarkdownEditor'));

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

  const handleDescriptionChange = (value: string | undefined) => {
    if (editingId) {
      dispatch(updateTask({
        id: editingId,
        changes: {
          description: value,
        },
      }));
    }
  };

  return (
    <div className={styles.editTask}>
      <div className={styles.taskNumber}>
        #{toEdit?.number}
      </div>

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

      <Suspense fallback={<SuspeseLoader />}>
        <MarkdownEditor
          label={`${t('common:description')}`}
          onChange={handleDescriptionChange}
          value={toEdit?.description ?? ''}
        />
      </Suspense>

      <Select
        label={t('tasks:taskLists')}
        fullWidth
        name='taskListId'
        onChange={handleChange}
        value={toEdit?.taskListId}
        defaultValue={undefined}
      >
        <option value=''>{t('common:none')}</option>

        {taskLists?.map(taskList => (
          <option key={taskList.id} value={taskList.id}>{taskList.name}</option>
        ))}
      </Select>

      <Input
        label={t('tasks:dueDate')}
        fullWidth
        name='dueDate'
        onChange={handleChange}
        value={toEdit?.dueDate ?? ''}
        type='date'
      />

      <RightSidebarCenterButton>
        <Button
          className={styles.deleteButton}
          onClick={() => deleteTask(editingId)}
          icon={<span className='material-icons'>delete</span>}
          deleteButton
        >
          {t('tasks:deleteTask')}
        </Button>
      </RightSidebarCenterButton>
    </div>
  );
};

export default EditTask;
