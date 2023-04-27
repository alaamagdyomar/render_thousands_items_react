import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';

function Table({ rowHeight = 35, tableHeight = 400, rows }) {
  // State variables for column names and scroll position
  const [columns] = useState(Object.keys(rows[0]));
  
  // Define the initial scroll state with a `top` value of 0, and an `index` and `end`
  // value based on the `tableHeight` and `rowHeight` props
  const [scroll, setScroll] = useState({
    top: 0,
    index: 0,
    end: Math.ceil((tableHeight * 2) / rowHeight),
  });

  // Callback function for handling table scroll events
  const onScroll = (event) => {
    const { scrollTop } = event.target;
    const index = Math.floor(scrollTop / rowHeight);
    const end = index + Math.ceil((tableHeight * 2) / rowHeight);
    const top = index * rowHeight;

    setScroll({ top, index, end });
  };

  // Helper function for generating table rows
  const generateRows = () => {
    const items = [];

    // Generate rows based on scroll position and table data
    for (let i = scroll.index; i < scroll.end && i < rows.length; i++) {
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

      const cells = columns.map((column, j) => (
        <td key={j}>{rows[i][column]}</td>
      ));

      items.push(<tr {...rowAttrs}>{cells}</tr>);
    }

    return items;
  };

  // Attributes for the table element
  const tableAttrs = {
    className: 'table-content',
    style: { height: tableHeight },
    onScroll,
  };

  // Attributes for the tbody element
  const tbodyAttr = {
    style: {
      position: 'relative',
      display: 'inline-block',
      height: tableHeight,
      maxHeight: tableHeight,
      width: '100%',
    },
  };

  // Render the table component
  return (
    <div className="wrapper">
      <table>
        <thead>
          <tr className="tr">
            {/* Render table column headers */}
            {columns.map((name, i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
        </thead>
      </table>
      <table {...tableAttrs}>
        {/* Render table body */}
        <tbody {...tbodyAttr}>{generateRows()}</tbody>
      </table>
    </div>
  );
}

// Prop types for the Table component
Table.propTypes = {
  rowHeight: PropTypes.number,
  tableHeight: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
