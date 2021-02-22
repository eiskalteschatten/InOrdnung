import React, { createContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { KanbanBoard, KanbanTask } from '../../../interfaces/kanban';
import { State } from '../../../store';

interface DraggingTask {
  rect: DOMRect;
  task: KanbanTask;
}

interface IContext {
  editBoard?: KanbanBoard;
  editColumnId: string;
  setEditColumnId: (columnId: string) => void;
  editingTask: KanbanTask | undefined;
  setEditingTask: (task?: KanbanTask) => void;
  isNewTask: boolean;
  setIsNewTask: (isNewTask: boolean) => void;
  draggingTask?: DraggingTask;
  setDraggingTask: (task?: DraggingTask) => void;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const Context = createContext<IContext>({
  editBoard: undefined,
  editColumnId: '',
  setEditColumnId: (columnId: string) => {},
  editingTask: undefined,
  setEditingTask: (task?: KanbanTask) => {},
  isNewTask: false,
  setIsNewTask: (isNewTask: boolean) => {},
  draggingTask: undefined,
  setDraggingTask: (task?: DraggingTask) => {},
});
/* eslint-enable @typescript-eslint/no-unused-vars */

interface Props {
  children?: any;
}

export const KanbanContextWrapper: React.FC<Props> = ({ children }) => {
  const [editColumnId, setEditColumnId] = useState<string>('');
  const [editingTask, setEditingTask] = useState<KanbanTask>();
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [draggingTask, setDraggingTask] = useState<DraggingTask>();

  const boards = useSelector((state: State) => state.project?.kanban?.boards);

  const editBoard = useMemo(() =>
    boards.find(board =>
      board.columns?.some(({ id }) => id === editColumnId)
    ), [editColumnId]);

  return (
    <Context.Provider value={{
      editBoard,
      editColumnId,
      setEditColumnId,
      editingTask,
      setEditingTask,
      isNewTask,
      setIsNewTask,
      draggingTask,
      setDraggingTask,
    }}>
      {children}
    </Context.Provider>
  );
};
