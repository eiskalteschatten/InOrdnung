import React from 'react';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';
import BookmarksTable from './components/BookmarksTable';

const Bookmarks: React.FC = () => {
  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow>
        <BookmarksTable />
      </Column>
    </ProjectLayout>
  );
};

export default Bookmarks;
