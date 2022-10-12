import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setEditingId } from '../../store/entities/project/bookmarks';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';
import BookmarksTable from './components/BookmarksTable';
import RightSidebar from '../../components/elements/RightSidebar';
import EditBookmark from './components/EditBookmark';

const Bookmarks: React.FC = () => {
  const { t } = useTranslation(['bookmarks']);
  const dispatch = useAppDispatch();
  const { editingId } = useAppSelector(state => state.project.bookmarks);

  const handleSidebarClose = () => dispatch(setEditingId());

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow>
        <BookmarksTable />
      </Column>

      {editingId && (
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
