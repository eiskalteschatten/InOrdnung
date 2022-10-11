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
      footer: info => info.column.id,
    }),
    columnHelper.accessor('url', {
      id: 'url',
      header: () => <span>{t(('bookmarks:url'))}</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
  ]), [bookmarks]);

  const table = useReactTable({
    data: bookmarks || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>table</>
  );
};

export default BookmarksTable;
