import React from "react";
import _ from "lodash";

function TableBody({ data, columns }) {
  const createKeys = (item, column) => {
    return item._id + (column.path || column.key);
  };
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.requests) return column.requests;

    return _.get(item, column.path);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((c) => (
            <td key={createKeys(item, c)}>{renderCell(item, c)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
