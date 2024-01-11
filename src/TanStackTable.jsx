import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Cell } from "./Cell";

export const TanStackTable = ({ columns, rows }) => {
  const columnsDef = useMemo(
    () =>
      columns.map((col) => ({
        accessorKey: col.name,
        accessorFn: (row) => row[col.name],
        header: () => col?.string ?? col.name,
        cell: ({ row }) => <Cell value={row.original?.[col.name] ?? ""} />,
        footer: () => "",
      })),
    [columns]
  );

  const table = useReactTable({
    columns: columnsDef,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((head) => {
          return (
            <tr key={head.id}>
              {head.headers.map((header) => (
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
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
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
  );
};
