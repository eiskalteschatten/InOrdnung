import React from 'react';
import clsx from 'clsx';

import {
  flexRender,
  Row,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';

import styles from './styles.module.scss';

interface Props<T> {
  tableData: TableOptions<T>;
  className?: string;
  onRowHover?: (row: Row<T>) => void;
  onRowOut?: (row: Row<T>) => void;
  onRowContextMenu?: (row: Row<T>) => void;
  onRowClick?: (row: Row<T>) => void;
  rowSelectedId?: string | number;
}

function ReactTable<T>(props: Props<T & { id: string | number }>): React.ReactElement {
  const {
    tableData,
    className,
    onRowHover,
    onRowOut,
    onRowContextMenu,
    onRowClick,
    rowSelectedId,
  } = props;

  const table = useReactTable(tableData);

  return (
    <table className={clsx(styles.table, className)}>
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

                    {header.column.getCanSort() && (
                      <>
                        {{
                          asc: <span className='material-icons'>expand_less</span>,
                          desc: <span className='material-icons'>expand_more</span>,
                        }[header.column.getIsSorted() as string] ?? <span className='material-icons'>unfold_more</span>}
                      </>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className={clsx(styles.row, {
              [styles.selected]: rowSelectedId && row.original.id === rowSelectedId,
            })}
            onMouseOver={() => onRowHover && onRowHover(row)}
            onMouseOut={() => onRowOut && onRowOut(row)}
            onContextMenu={() => onRowContextMenu && onRowContextMenu(row)}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className={styles.column} style={{ width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReactTable;
