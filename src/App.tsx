import React from "react";
import { Table } from "./components/Table/Table";
import { mockData } from "./service/data.mock";

function App() {
  return (
    <div className="App">
      <Table data={mockData.data.items} />
    </div>
  );
}

export default App;
