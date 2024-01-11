import "./App.css";
import { NativeTable } from "./NativeTable.jsx";
import { TanStackTable } from "./TanStackTable.jsx";

import DATA from "./data.json";
import { useEffect, useState } from "react";

const { columns, records } = DATA;
function App() {
  const [rows, setRows] = useState(records);

  useEffect(() => {
    setTimeout(() => {
      setRows((rows) => {
        const newRows = [...rows];
        newRows[3].description = "TOTO";
        return newRows;
      });
    }, 2000);
  }, []);

  return (
    <div className="App">
      <main>
        <NativeTable columns={columns} rows={rows} />
        <TanStackTable columns={columns} rows={rows} />
      </main>
    </div>
  );
}

export default App;
