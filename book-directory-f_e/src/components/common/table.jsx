import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

function Table({ data, columns }) {
  return (
    <table className="table table-dark table-hover">
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
