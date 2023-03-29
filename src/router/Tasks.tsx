import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Tasks from '../pages/Tasks';
import TaskArchive from '../pages/Tasks/Archive';
import TaskList from '../pages/Tasks/TaskList';

const TasksRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/list/:taskListId' element={<TaskList />} />
      <Route path='/archive' element={<TaskArchive />} />
      <Route path='*' element={<Tasks />} />
    </Routes>
  );
};

export default TasksRouter;
