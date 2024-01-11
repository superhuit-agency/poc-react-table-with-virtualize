import { useEffect, useRef, useState } from "react";

import "./App.css";
import { NativeTable } from "./NativeTable.jsx";
import { TanStackTable } from "./TanStackTable.jsx";

import DATA from "./data.json";

const { columns, records } = DATA;
function App() {
  const [rows, setRows] = useState(records);
  const mainRef = useRef(null);

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
      <main ref={mainRef}>
        <NativeTable columns={columns} rows={rows} parentRef={mainRef} />
        <TanStackTable columns={columns} rows={rows} parentRef={mainRef} />
      </main>
    </div>
  );
}

export default App;
