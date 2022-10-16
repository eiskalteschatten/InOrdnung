import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
} from '@tanstack/react-table';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setBookmarksSortingState } from '../../../../store/entities/ui/preferences';
import { bookmarkSelectors } from '../../../../store/entities/project/bookmarks';

import { Bookmark } from '../../../../shared/interfaces/bookmarks';
import ReactTable from '../../../../components/elements/ReactTable';
import Button from '../../../../components/elements/Button';
import { isValidUrl } from '../../../../shared/lib/helpers/url';
import { deleteBookmark, editBookmark } from '../../../../shared/lib/bookmarks';

import styles from './styles.module.scss';

const columnHelper = createColumnHelper<Bookmark>();

const BookmarksTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(bookmarkSelectors.selectAll);
  const { bookmarks: bookmarksUi } = useAppSelector(state => state.ui.preferences);
  const { t } = useTranslation(['common']);
  const [sorting, setSorting] = useState<SortingState>(bookmarksUi?.sortingState ?? []);
  const [hoverRowId, setHoverRowId] = useState<string | undefined>();

  useEffect(() => {
    dispatch(setBookmarksSortingState(sorting));
  }, [sorting]);

  const openInBrowser = (url: string) => {
    if (url) {
      window.api.send('openLink', url);
    }
  };

  const handleRowHover = (row: Row<Bookmark>) => {
    setHoverRowId(row.id);
  };

  const handleRowOut = () => {
    setHoverRowId(undefined);
  };

  const handleRowContextMenu = (row: Row<Bookmark>) => {
    window.api.send('openBookmarkContextMenu', row.original.id);
  };

  const columns = useMemo(() => ([
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <span>{t(('common:name'))}</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('url', {
      id: 'url',
      header: () => <span>{t(('common:url'))}</span>,
      cell: info => (
        <div className={styles.linkCell}>
          <div>{info.getValue()}</div>
          {isValidUrl(info.getValue()) && (
            <Button onClick={() => openInBrowser(info.getValue())}>
              <span className='material-icons'>open_in_browser</span>
            </Button>
          )}
        </div>
      ),
    }),
    {
      id: 'buttons',
      cell: (info: any) => (
        <div className={clsx(styles.buttonCell, {
          [styles.visible]: hoverRowId === info.row.id,
        })}>
          <Button onClick={() => editBookmark(info.row.original.id)}>
            <span className='material-icons'>edit</span>
          </Button>
          <Button onClick={() => deleteBookmark(info.row.original.id)}>
            <span className='material-icons'>delete</span>
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 80,
    },
  ]), [bookmarks, hoverRowId]);

  return (
    <ReactTable<Bookmark>
      onRowHover={handleRowHover}
      onRowOut={handleRowOut}
      onRowContextMenu={handleRowContextMenu}
      tableData={{
        data: bookmarks,
        columns,
        state: {
          sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
      }}
    />
  );
};

export default BookmarksTable;
