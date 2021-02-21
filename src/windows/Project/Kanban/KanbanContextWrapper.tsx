import React, { createContext, useState } from 'react';

import { KanbanTask } from '../../../interfaces/kanban';

interface IContext {
  editColumnId: string;
  setEditColumnId: (columnId: string) => void;
  editingTask: KanbanTask | undefined;
  setEditingTask: (task?: KanbanTask) => void;
}

export const Context = createContext<IContext>({
  editColumnId: '',
  setEditColumnId: (columnId: string) => {},  // eslint-disable-line @typescript-eslint/no-unused-vars
  editingTask: undefined,
  setEditingTask: (task?: KanbanTask) => {},  // eslint-disable-line @typescript-eslint/no-unused-vars
});

interface Props {
  children?: any;
}

export const KanbanContextWrapper: React.FC<Props> = ({ children }) => {
  const [editColumnId, setEditColumnId] = useState<string>('');
  const [editingTask, setEditingTask] = useState<KanbanTask | undefined>();

  return (
    <Context.Provider value={{
      editColumnId,
      setEditColumnId,
      editingTask,
      setEditingTask,
    }}>
      {children}
    </Context.Provider>
  );
};
