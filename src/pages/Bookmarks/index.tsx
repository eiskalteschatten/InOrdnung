import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/hooks';
import { setEditingBookmark } from '../../store/entities/project/bookmarks';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';
import BookmarksTable from './components/BookmarksTable';
import RightSidebar from '../../components/elements/RightSidebar';
import EditBookmark from './components/EditBookmark';

const Bookmarks: React.FC = () => {
  const { t } = useTranslation(['bookmarks']);
  const dispatch = useAppDispatch();

  const handleSidebarClose = () => dispatch(setEditingBookmark());

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow>
        <BookmarksTable />
      </Column>

      <RightSidebar
        title={t('bookmarks:editBookmark')}
        handleClose={handleSidebarClose}
      >
        <EditBookmark />
      </RightSidebar>
    </ProjectLayout>
  );
};

export default Bookmarks;
