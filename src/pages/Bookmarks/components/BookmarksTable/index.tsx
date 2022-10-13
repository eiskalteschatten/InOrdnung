import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  createColumnHelper,
  getCoreRowModel,
  SortingState,
} from '@tanstack/react-table';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setBookmarksSortingState } from '../../../../store/entities/ui/preferences';
import { bookmarkSelectors, setEditingId, deleteBookmark } from '../../../../store/entities/project/bookmarks';

import { Bookmark } from '../../../../shared/interfaces/bookmarks';
import Button from '../../../../components/elements/Button';

import styles from './styles.module.scss';
import ReactTable from '../../../../components/elements/ReactTable';

const columnHelper = createColumnHelper<Bookmark>();

const BookmarksTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(bookmarkSelectors.selectAll);
  const { sortingState } = useAppSelector(state => state.ui.preferences.bookmarks);
  const { t } = useTranslation(['bookmarks']);
  const [sorting, setSorting] = useState<SortingState>(sortingState);

  useEffect(() => {
    dispatch(setBookmarksSortingState(sorting));
  }, [sorting]);

  const openInBrowser = (url: string) => {
    if (url) {
      window.api.send('openLink', url);
    }
  };

  const editBookmark = (id: string) => {
    dispatch(setEditingId(id));
  };

  const _deleteBookmark = (id: string) => {
    // TODO: prompt user to confirm deletion
    dispatch(deleteBookmark(id));
  };

  const columns = useMemo(() => ([
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <span>{t(('bookmarks:name'))}</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('url', {
      id: 'url',
      header: () => <span>{t(('bookmarks:url'))}</span>,
      cell: info => (
        <div className={styles.linkCell}>
          <div>{info.getValue()}</div>
          <Button onClick={() => openInBrowser(info.getValue())}>
            <span className='material-icons'>open_in_browser</span>
          </Button>
        </div>
      ),
    }),
    {
      id: 'buttons',
      cell: (info: any) => (
        <div className={styles.buttonCell}>
          <Button onClick={() => editBookmark(info.row.original.id)}>
            <span className='material-icons'>edit</span>
          </Button>
          <Button onClick={() => _deleteBookmark(info.row.original.id)}>
            <span className='material-icons'>delete</span>
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 80,
    },
  ]), [bookmarks]);

  // TODO: context menus
  return (
    <ReactTable<Bookmark>
      tableData={{
        data: bookmarks,
        columns,
        state: {
          sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
      }}
    />
  );
};

export default BookmarksTable;
