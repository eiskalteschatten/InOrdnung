import React from 'react';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';
import BookmarksTable from './components/BookmarksTable';
import RightSidebar from '../../components/elements/RightSidebar';
import EditBookmark from './components/EditBookmark';

const Bookmarks: React.FC = () => {
  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow>
        <BookmarksTable />
      </Column>

      <RightSidebar>
        <EditBookmark />
      </RightSidebar>
    </ProjectLayout>
  );
};

export default Bookmarks;
