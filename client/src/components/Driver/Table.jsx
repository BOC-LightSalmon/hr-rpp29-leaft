import React from 'react';
import { useTable, useFlexLayout } from 'react-table';

const Table = ({ routes, cancelRoute, showRoute }) => {
  const data = React.useMemo(() => routes, [routes]);

  const columns = React.useMemo(() => [
    {
      Header: 'Pick-Up',
      accessor: 'pickUp'
    },
    {
      Header: 'Drop-Off',
      accessor: 'dropOff'
    },
    {
      Header: 'Departure',
      accessor: 'departure'
    }
  ], []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 10,
      width: 150,
      maxWidth: 90,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn
  },
  useFlexLayout);

  return(
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} id="table-header">
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} id={column.Header.toLowerCase()}>{column.render('Header')}</th>
            ))}
        </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return(
            <tr {...row.getRowProps()} className="table-row">
              <td className="cancel" onClick={cancelRoute} id={row.original.id}>X</td>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()} onClick={showRoute}>{cell.render('Cell')}</td>
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;