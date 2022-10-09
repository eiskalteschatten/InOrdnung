import React from 'react';

import Toolbar from './components/Toolbar';
import MainLayout from '../../components/layouts/MainLayout';
import Column from '../../components/elements/Column';

const Bookmarks: React.FC = () => {
  return (
    <MainLayout
      toolbar={<Toolbar />}
    >
      <Column flexGrow>
        bookmarks
      </Column>
    </MainLayout>
  );
};

export default Bookmarks;
