import React from "react";

function TableHeader({ columns }) {
  const createKeys = (column) => {
    return column.path || column.key;
  };
  return (
    <thead>
      <tr>
        {columns.map((c) => (
          <th key={createKeys(c)}>{c.Title}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
