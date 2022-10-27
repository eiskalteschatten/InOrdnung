import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProjectInfo from '../pages/ProjectInfo';
import BookmarksRouter from './Bookmarks';
import TasksRouter from './Tasks';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/bookmarks/*' element={<BookmarksRouter />} />
      <Route path='/tasks/*' element={<TasksRouter />} />
      <Route path='*' element={<ProjectInfo />} />
    </Routes>
  );
};

export default Router;
