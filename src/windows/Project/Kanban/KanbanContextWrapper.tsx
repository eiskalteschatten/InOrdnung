import React, { createContext, useState } from 'react';

import { KanbanTask } from '../../../interfaces/kanban';

interface IContext {
  editColumnId: string;
  setEditColumnId: (columnId: string) => void;
  editingTask: KanbanTask | undefined;
  setEditingTask: (task?: KanbanTask) => void;
  isNewTask: boolean;
  setIsNewTask: (isNewTask: boolean) => void;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const Context = createContext<IContext>({
  editColumnId: '',
  setEditColumnId: (columnId: string) => {},
  editingTask: undefined,
  setEditingTask: (task?: KanbanTask) => {},
  isNewTask: false,
  setIsNewTask: (isNewTask: boolean) => {},
});
/* eslint-enable @typescript-eslint/no-unused-vars */

interface Props {
  children?: any;
}

export const KanbanContextWrapper: React.FC<Props> = ({ children }) => {
  const [editColumnId, setEditColumnId] = useState<string>('');
  const [editingTask, setEditingTask] = useState<KanbanTask | undefined>();
  const [isNewTask, setIsNewTask] = useState<boolean>(false);

  return (
    <Context.Provider value={{
      editColumnId,
      setEditColumnId,
      editingTask,
      setEditingTask,
      isNewTask,
      setIsNewTask,
    }}>
      {children}
    </Context.Provider>
  );
};
