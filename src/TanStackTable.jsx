import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import { Cell } from "./Cell";

export const TanStackTable = ({ columns, rows, parentRef }) => {
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 20,
  });

  const columnsDef = useMemo(
    () =>
      columns.map((col) => ({
        accessorKey: col.name,
        accessorFn: (row) => row?.[col.name] ?? "",
        header: () => col?.string ?? col.name,
        cell: ({ row, ...info }) => (
          <Cell defaultValue={info.getValue()} label={col.name} />
        ),
        footer: () => "",
        debugTable: true,
      })),
    [columns]
  );

  const table = useReactTable({
    columns: columnsDef,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
            );
          })}
        </thead>
        <tbody>
          {virtualizer.getVirtualItems().map((virtualRow, index) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <tr
                id={`row-id-${row.id}`}
                key={row.id}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${
                    virtualRow.start - index * virtualRow.size
                  }px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
