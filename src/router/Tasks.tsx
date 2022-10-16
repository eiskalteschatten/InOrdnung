import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Tasks from '../pages/Tasks';
import TaskList from '../pages/Tasks/TaskList';

const TasksRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/list/:taskListId' element={<TaskList />} />
      <Route path='*' element={<Tasks />} />
    </Routes>
  );
};

export default TasksRouter;
