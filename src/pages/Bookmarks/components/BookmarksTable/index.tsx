import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import {
  createColumnHelper,
  getCoreRowModel,
  Row,
  SortingState,
} from '@tanstack/react-table';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setBookmarksSortingState } from '../../../../store/entities/ui/preferences';
import { bookmarkSelectors, deleteBookmark } from '../../../../store/entities/project/bookmarks';

import { Bookmark } from '../../../../shared/interfaces/bookmarks';
import ReactTable from '../../../../components/elements/ReactTable';
import Button from '../../../../components/elements/Button';
import { isValidUrl } from '../../../../shared/lib/helpers/url';

import styles from './styles.module.scss';

const columnHelper = createColumnHelper<Bookmark>();

const BookmarksTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(bookmarkSelectors.selectAll);
  const { sortingState } = useAppSelector(state => state.ui.preferences.bookmarks);
  const { t } = useTranslation(['bookmarks']);
  const [sorting, setSorting] = useState<SortingState>(sortingState);
  const [hoverRowId, setHoverRowId] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setBookmarksSortingState(sorting));
  }, [sorting]);

  const openInBrowser = (url: string) => {
    if (url) {
      window.api.send('openLink', url);
    }
  };

  const editBookmark = (id: string) => {
    navigate(`/bookmarks/edit/${id}`);
  };

  const _deleteBookmark = (id: string) => {
    const result = window.api.sendSync('openAlert', {
      message: t('bookmarks:confirmDeleteBookmark'),
      detail: t('common:areYouSureYouWantToContinue'),
      types: 'warning',
      buttons: [t('common:no'), t('common:yes')],
    });

    if (result === 1) {
      dispatch(deleteBookmark(id));
      navigate('/bookmarks');
    }
  };

  const handleRowHover = (row: Row<Bookmark>) => {
    setHoverRowId(row.id);
  };

  const handleRowOut = () => {
    setHoverRowId(undefined);
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
          <Button onClick={() => _deleteBookmark(info.row.original.id)}>
            <span className='material-icons'>delete</span>
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 80,
    },
  ]), [bookmarks, hoverRowId]);

  // TODO: context menus
  // TODO: fix sorting
  return (
    <ReactTable<Bookmark>
      onRowHover={handleRowHover}
      onRowOut={handleRowOut}
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
