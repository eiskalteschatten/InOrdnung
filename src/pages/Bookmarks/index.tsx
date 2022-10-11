import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
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
  const { editing } = useAppSelector(state => state.project.bookmarks);

  const handleSidebarClose = () => dispatch(setEditingBookmark());

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow>
        <BookmarksTable />
      </Column>

      {editing && (
        <RightSidebar
          title={t('bookmarks:editBookmark')}
          handleClose={handleSidebarClose}
        >
          <EditBookmark />
        </RightSidebar>
      )}
    </ProjectLayout>
  );
};

export default Bookmarks;
