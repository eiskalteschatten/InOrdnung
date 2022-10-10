import React from 'react';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';

const Bookmarks: React.FC = () => {
  return (
    <ProjectLayout
      toolbar={<Toolbar />}
    >
      <Column flexGrow>
        bookmarks
      </Column>
    </ProjectLayout>
  );
};

export default Bookmarks;
