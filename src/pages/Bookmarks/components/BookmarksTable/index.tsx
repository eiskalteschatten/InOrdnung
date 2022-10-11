import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setBookmarksSortingState } from '../../../../store/entities/ui/preferences';
import { Bookmark } from '../../../../shared/interfaces/bookmarks';
import Button from '../../../../components/elements/Button';

import styles from './styles.module.scss';

const columnHelper = createColumnHelper<Bookmark>();

const BookmarksTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { all: bookmarks } = useAppSelector(state => state.project.bookmarks);
  const { bookmarksSortingState } = useAppSelector(state => state.ui.preferences);
  const { t } = useTranslation(['bookmarks']);
  const [sorting, setSorting] = useState<SortingState>(bookmarksSortingState);

  useEffect(() => {
    dispatch(setBookmarksSortingState(sorting));
  }, [sorting]);

  const openInBrowser = (url: string) => {
    if (url) {
      window.api.send('openLink', url);
    }
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
    // TODO: edit and delete controls
    // columnHelper.accessor('url', {
    //   id: 'controls',
    //   header: () => <span>{t(('bookmarks:url'))}</span>,
    //   cell: info => info.getValue(),
    // }),
  ]), [bookmarks]);

  const table = useReactTable({
    data: bookmarks || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? styles.canSort
                        : styles.cannotSort,
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <span className='material-icons'>expand_less</span>,
                      desc: <span className='material-icons'>expand_more</span>,
                    }[header.column.getIsSorted() as string] ?? <span className='material-icons'>unfold_more</span>}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {/* TODO: context menu */}
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookmarksTable;
