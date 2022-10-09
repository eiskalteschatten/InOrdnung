import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProjectInfo from '../pages/ProjectInfo';
import Bookmarks from '../pages/Bookmarks';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/bookmarks/*' element={<Bookmarks />} />
      <Route path='*' element={<ProjectInfo />} />
    </Routes>
  );
};

export default Router;
