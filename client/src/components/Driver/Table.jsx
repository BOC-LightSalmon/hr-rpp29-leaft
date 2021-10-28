import React from 'react';

import { useTable } from 'react-table';

const Table = (props) => {
  const routes = props.routes;

  const data = React.useMemo(() => routes, [routes]);

  const columns = React.useMemo(() => [
    {
      Header: 'Start',
      accessor: 'start'
    },
    {
      Header: 'End',
      accessor: 'end'
    },
    {
      Header: 'Departure',
      accessor: 'departure'
    },
    {
      Header: 'Seats',
      accessor: 'seats'
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data
  });

  return(
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
        </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return(
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;