import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { State } from '../../../store';
import { uiSetOpenEditKanbanTaskDialog } from '../../../store/actions/uiTempActions';
import { KanbanContextWrapper } from './KanbanContextWrapper';
import Board from './Board';
import TaskDialog from './TaskDialog';

// import styles from './Kanban.module.scss';

const Kanban: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: State) => state.project?.kanban?.boards);
  const openEditTaskDialog = useSelector((state: State) => state.uiTemp.openEditKanbanTaskDialog);

  return (
    <KanbanContextWrapper>
      {/*
        Assume the default board is at index 0 until users can
        add/edit/delete boards themselves.
      */}
      <Board
        board={boards[0]}
      />

      <TaskDialog
        open={openEditTaskDialog}
        close={() => dispatch(uiSetOpenEditKanbanTaskDialog(false))}
      />
    </KanbanContextWrapper>
  );
};

export default Kanban;
