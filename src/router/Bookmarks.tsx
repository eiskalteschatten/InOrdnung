import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Bookmarks from '../pages/Bookmarks';

const BookmarksRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/edit/:editingId' element={<Bookmarks />} />
      <Route path='*' element={<Bookmarks />} />
    </Routes>
  );
};

export default BookmarksRouter;
