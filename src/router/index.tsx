import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProjectInfo from '../pages/ProjectInfo';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='*' element={<ProjectInfo />} />
    </Routes>
  );
};

export default Router;
