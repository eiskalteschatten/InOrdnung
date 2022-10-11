import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useAppSelector } from '../../../../store/hooks';
import { Bookmark } from '../../../../shared/interfaces/bookmarks';

const columnHelper = createColumnHelper<Bookmark>();

const BookmarksTable: React.FC = () => {
  const { all: bookmarks } = useAppSelector(state => state.project.bookmarks);
  const { t } = useTranslation(['bookmarks']);

  const columns = useMemo(() => ([
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <span>{t(('bookmarks:name'))}</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('url', {
      id: 'url',
      header: () => <span>{t(('bookmarks:url'))}</span>,
      cell: info => info.getValue(),
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
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
