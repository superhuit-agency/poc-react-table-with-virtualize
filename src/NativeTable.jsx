export const NativeTable = ({ columns, rows }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={column.name}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id}>
            {columns.map((col, index) => (
              <td key={`${row.id}-${col.name}`}>{row[col.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
