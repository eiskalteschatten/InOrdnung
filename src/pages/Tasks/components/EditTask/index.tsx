import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/hooks';
import { taskSelectors } from '../../../../store/entities/project/tasks';

import { Task } from '../../../../shared/interfaces/tasks';
import { generateNewTask } from '../../../../shared/lib/tasks';
import Input from '../../../../components/elements/Input';
import TextArea from '../../../../components/elements/TextArea';

import styles from './styles.module.scss';

type FormState = Task;

interface FormAction {
  type: string;
  payload: Task | string;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  const { type, payload } = action;

  if (type === 'setAll') {
    return payload as Task;
  }

  return {
    ...state,
    [type]: payload,
  };
};

interface Props {
  editingId: string;
}

const EditTask: React.FC<Props> = ({ editingId }) => {
  const { t } = useTranslation(['common']);
  const state = useAppSelector(state => state);
  const { taskListId } = useParams();
  const [formState, formDispatch] = useReducer(formReducer, generateNewTask(taskListId));

  useEffect(() => {
    if (editingId) {
      const toEdit = taskSelectors.selectById(state, editingId);

      if (toEdit) {
        formDispatch({ type: 'setAll', payload: toEdit });
      }
    }
  }, [editingId]);

  return (
    <div className={styles.editTask}>
      <Input
        label={t('common:name')}
        fullWidth
        name='name'
        onChange={e => formDispatch({ type: e.target.name, payload: e.target.value })}
        value={formState.name}
      />

      <TextArea
        label={t('common:description')}
        fullWidth
        name='description'
        onChange={e => formDispatch({ type: e.target.name, payload: e.target.value })}
        value={formState.description}
      />
    </div>
  );
};

export default EditTask;
