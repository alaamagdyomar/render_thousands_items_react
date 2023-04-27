import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';

function Table({ rowHeight = 35, tableHeight = 400, rows }) {
  // State variables for column names and scroll position
  const [columns] = useState(Object.keys(rows[0]));
  const [editedRows, setEditedRows] = useState({});
  const [tableRows, setTableRows] = useState(rows); 
  
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

  // Define a function to handle row updates
    const handleRowUpdate = (index, updatedRow) => {
      // Create a copy of tableRows to avoid mutating state directly
      const newTableRows = [...tableRows];
      // Replace the updated row in the copied array
      newTableRows[index] = updatedRow;
      // Update the state with the new array
      setTableRows(newTableRows);
    };

  // Helper function for generating table rows
  const generateRows = () => {
      const items = [];

      for (let i = scroll.index; i < scroll.end && i < tableRows.length; i++) {
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
          onClick: () => setEditedRows({ ...editedRows, [i]: true }),
        };
        const handleBlur = () => setEditedRows({ ...editedRows, [i]: false });
        const handleKeyPress = (event) => {
          if (event.key === 'Enter') {
            setEditedRows({ ...editedRows, [i]: false });
          }
        };
        const cells = columns.map((column, j) => {
          if (editedRows[i]) {
            return (
              <td key={j}>
                <input
                  type="text"
                  defaultValue={tableRows[i][column]}
                  onBlur={() => handleBlur(i)}
                  onKeyPress={handleKeyPress}
                  onChange={(event) => {
                    const updatedRow = { ...tableRows[i], [column]: event.target.value };
                    handleRowUpdate(i, updatedRow);
                  }}
                />
              </td>
            );
          } else {
            return <td key={j}>{tableRows[i][column]}</td>;
          }
        });

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
