import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { KanbanBoard, KanbanTask } from '../../../interfaces/kanban';
import { State } from '../../../store';

interface IContext {
  editBoard?: KanbanBoard;
  setEditBoard: (board: KanbanBoard) => void;
  editColumnId: string;
  setEditColumnId: (columnId: string) => void;
  editingTask: KanbanTask | undefined;
  setEditingTask: (task?: KanbanTask) => void;
  isNewTask: boolean;
  setIsNewTask: (isNewTask: boolean) => void;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const Context = createContext<IContext>({
  editBoard: undefined,
  setEditBoard: (board: KanbanBoard) => {},
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
  const [editBoard, setEditBoard] = useState<KanbanBoard | undefined>();
  const [editColumnId, setEditColumnId] = useState<string>('');
  const [editingTask, setEditingTask] = useState<KanbanTask | undefined>();
  const [isNewTask, setIsNewTask] = useState<boolean>(false);

  const boards = useSelector((state: State) => state.project?.kanban?.boards);

  useEffect(() => {
    setEditBoard(boards.find(board =>
      board.columns?.some(({ id }) => id === editColumnId)
    ));
  }, [editColumnId]);

  return (
    <Context.Provider value={{
      editBoard,
      setEditBoard,
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
