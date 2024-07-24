import React from "react";
import { useTable } from "react-table";

export const Table = ({ children, addClass, ...props }) => (
  <div className="overflow-x-hidden max-h-[63vh] overflow-y-auto hide-scrollbar">
    <table
      {...props}
      className={`min-w-full bg-white border-gray-100 ${addClass}`}
    >
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, addClass, ...props }) => (
  <thead {...props} className={`bg-gray-100 sticky top-0 ${addClass}`}>
    {children}
  </thead>
);

export const TableRow = ({ children, addClass, ...props }) => (
  <tr {...props} className={`${addClass}`}>
    {children}
  </tr>
);

export const TableHead = ({ children, addClass, ...props }) => (
  <th
    {...props}
    className={`whitespace-nowrap font-medium py-2 px-4 border-b text-left ${addClass}`}
  >
    {children}
  </th>
);

export const TableBody = ({ children, ...props }) => (
  <tbody {...props}>{children}</tbody>
);

export const TableCell = ({ children, addClass, ...props }) => (
  <td {...props} className={`whitespace-nowrap py-2 px-4 border-b ${addClass}`}>
    {children}
  </td>
);

const CustomTable = ({ columns, data, renderHeaderCell, renderBodyCell }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHead {...column.getHeaderProps()}>
                {renderHeaderCell
                  ? renderHeaderCell(column)
                  : column.render("Header")}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <TableCell {...cell.getCellProps()}>
                  {renderBodyCell
                    ? renderBodyCell(cell.value, cell.row.original, cell.column)
                    : cell.render("Cell")}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
