import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';

function Table(props) {
  const [columns] = useState(Object.keys(props.rows[0]));
  const [tableHeight, setTableHeight] = useState(props.tableHeight);
  const [scroll, setScroll] = useState({
    top: 0,
    index: 0,
    end: Math.ceil((props.tableHeight * 2) / props.rowHeight),
  });

  const onScroll = ({ target }) => {
    const scrollTop = target.scrollTop;
    const rowHeight = props.rowHeight;
    const index = Math.floor(scrollTop / rowHeight);

    setScroll((prevScroll) => ({
      ...prevScroll,
      index,
      end: index + Math.ceil((tableHeight * 2) / rowHeight),
      top: (scrollTop / rowHeight) * rowHeight,
    }));
  };

  const generateRows = () => {
    const rowHeight = props.rowHeight;
    const rows = props.rows;
    const index = scroll.index;
    const end = scroll.end;
    const items = [];

    let i = index;
    while (i < end && i < rows.length) {
      const rowAttrs = {
        style: {
          position: 'absolute',
          top: i * rowHeight,
          left: 0,
          height: rowHeight,
          lineHeight: `${rowHeight}px`,
        },
        className: `tr ${i % 2 === 0 ? 'tr-odd' : 'tr-even'}`,
        key: i,
      };

      items.push(
        <tr {...rowAttrs}>
          {columns.map((column, j) => (
            <td key={j}>{rows[i][column]}</td>
          ))}
        </tr>
      );

      i++;
    }

    return items;
  };

  const tableAttrs = {
    className: 'table-content',
    style: { height: tableHeight },
    onScroll: onScroll,
  };

  const tbodyAttr = {
    style: {
      position: 'relative',
      display: 'inline-block',
      height: tableHeight,
      maxHeight: tableHeight,
      width: '100%',
    },
  };

  return (
    <div className={'wrapper'}>
      <table>
        <thead>
          <tr className={'tr'}>
            {columns.map((name, i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
        </thead>
      </table>
      <table {...tableAttrs}>
        <tbody {...tbodyAttr}>{generateRows()}</tbody>
      </table>
    </div>
  );
}

Table.defaultProps = {
  rowHeight: 35,
  tableHeight: 400,
};

Table.propTypes = {
  rowHeight: PropTypes.number.isRequired,
  tableHeight: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
