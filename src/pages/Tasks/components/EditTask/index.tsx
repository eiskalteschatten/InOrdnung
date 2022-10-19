import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../store/hooks';
import { taskSelectors } from '../../../../store/entities/project/tasks';

import { Task } from '../../../../shared/interfaces/tasks';
import { generateNewTask } from '../../../../shared/lib/tasks';

type FormState = Task;

interface FormAction {
  type: string;
  payload: Task | string;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  const { type, payload } = action;

  switch (type) {
    case 'setAll':
      return payload as Task;
    default:
      return state;
  }
};

interface Props {
  editingId: string;
}

const EditTask: React.FC<Props> = ({ editingId }) => {
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
    <div>
      edit task
    </div>
  );
};

export default EditTask;
