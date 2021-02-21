import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../../store';
import Board from './Board';

// import styles from './Kanban.module.scss';

const Kanban: React.FC = () => {
  const boards = useSelector((state: State) => state.project?.kanban?.boards);

  return (
    <div>
      {/*
        Assume the default board is at index 0 until users can
        add/edit/delete boards themselves.
      */}
      <Board
        board={boards[0]}
      />
    </div>
  );
};

export default Kanban;
