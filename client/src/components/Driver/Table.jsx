import React from 'react';

import { useTable } from 'react-table';

const Table = (props) => {
  // const routes = props.routes;

  const data = React.useMemo(() => [
    {
      start: '1 Main St',
      end: '1 Oak St',
      departure: '1:00PM',
      seats: 3
    },
    {
      start: '5 Main St',
      end: '5 Oak St',
      departure: '5:00PM',
      seats: 3
    },
    {
      start: '10 Main St',
      end: '10 Oak St',
      departure: '10:00PM',
      seats: 3
    },
    {
      start: '1 Main St',
      end: '1 Oak St',
      departure: '1:00PM',
      seats: 3
    },
  ], []);

  const columns = React.useMemo(() => [
    {
      Header: 'Start',
      accessor: 'routes.start'
    },
    {
      Header: 'End',
      accessor: 'routes.end'
    },
    {
      Header: 'Departure',
      accessor: 'routes.departure'
    },
    {
      Header: 'Seats',
      accessor: 'routes.seats'
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
    // <div>this is a table</div>
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