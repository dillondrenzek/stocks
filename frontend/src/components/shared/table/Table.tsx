import React from 'react';

interface TableHeaderProps<T> {
  data: any;
  value: any;
}

interface TableHeader<T> {
  key: keyof Partial<T>,
  label: string;
  render?: (h: TableHeaderProps<T>) => React.ReactNode;
}

interface TableProps<T = any> {
  columns: TableHeader<T>[];
  data: T[];
}

export function Table<T = any>(props: TableProps<T>) {
  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          {props.columns.map(({ label }, i) => (
            <th key={i}>{label}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {props.data.length ? (props.data.map((tx, j) => (
          <tr key={j}>
            {props.columns.map(({ key, render }, i) => (
              tx ? (
                <td key={i}>
                  {typeof render === 'function' ? render({ data: tx, value: tx[key] }) : tx[key]}
                </td>
              ) : null
            ))}
          </tr>
        ))) : null}
      </tbody>
    </table>
  );

}