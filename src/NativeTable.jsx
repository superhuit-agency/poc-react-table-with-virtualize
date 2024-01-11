import { Cell } from "./Cell";
import { useVirtualizer } from "@tanstack/react-virtual";

export const NativeTable = ({ columns, rows, parentRef }) => {
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    debug: true,
  });

  return (
    <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.name}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {virtualizer.getVirtualItems().map((virtualRow, index) => {
            const row = rows[virtualRow.index];
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
                {columns.map((col, index) => (
                  <td key={`${row.id}-${col.name}`}>
                    <Cell
                      defaultValue={row?.[col.name] ?? ""}
                      label={col.name}
                    />
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
