import React from 'react';
import clsx from 'clsx';

import {
  flexRender,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';

import styles from './styles.module.scss';

interface Props<T> {
  tableData: TableOptions<T>;
  className?: string;
}

function ReactTable<T>({ tableData, className }: Props<T>): React.ReactElement {
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
        {/* TODO: context menus */}
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} style={{ width: cell.column.getSize() }}>
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
