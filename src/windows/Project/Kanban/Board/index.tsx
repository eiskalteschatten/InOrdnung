import React from 'react';

import { KanbanBoard } from '../../../../interfaces/kanban';
import Column from './Column';

// import styles from './Board.module.scss';

interface Props {
  board: KanbanBoard;
}

const Board: React.FC<Props> = ({ board }) => {

  return (
    <div>
      {board.columns?.map(column => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;
