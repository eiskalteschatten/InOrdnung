import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Tasks from '../pages/Tasks';

const TasksRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='*' element={<Tasks />} />
    </Routes>
  );
};

export default TasksRouter;
