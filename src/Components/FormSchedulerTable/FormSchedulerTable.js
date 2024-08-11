import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import Dropdown from "../Dropdown/Dropdown.js";
import "./FormSchedulerTable.css";

const FormSchedulerTable = ({
  selectedThreatData,
  selectedWeek,
  userTimes,
  onSaveData,
  formIsValid,
}) => {
  const [data, setData] = useState([]);
  const [dropdownSelections, setDropdownSelections] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setData(selectedThreatData);
  }, [selectedThreatData]);

  const handleDropdownChange = (rowIndex, day, selectedValue) => {
    setDropdownSelections((prevState) => ({
      ...prevState,
      [rowIndex]: {
        ...prevState[rowIndex],
        [day]: selectedValue,
      },
    }));
  };

  useEffect(() => {
    const newColumns = [
      { Header: "Title", accessor: "Title" },
      { Header: "Range", accessor: "range" },
      { Header: "System Type", accessor: "systemType" },
      ...selectedWeek.map((item) => ({
        Header: `${item["date"]}`,
        accessor: `${item["day"]}`,
        Cell: ({ row }) => {
          const rowIndex = row.index;
          const day = item["date"];

          // console.log("dds", dropdownSelections)
          // console.log("dropdownSelections[rowIndex]", dropdownSelections[rowIndex])
          // console.log("dropdownSelections[rowIndex][day]", dropdownSelections[rowIndex][day])

          return (
            <Dropdown
              style={{ zIndex: 9999 }}
              options={[
                "NONE",
                "All",
                ...userTimes.map((time) => `${time.start} - ${time.end}`),
              ]}
              placeholder={
                dropdownSelections[rowIndex] &&
                dropdownSelections[rowIndex][day]
              }
              onChange={(selected) =>
                handleDropdownChange(rowIndex, day, selected)
              }
              value={
                dropdownSelections[rowIndex] &&
                dropdownSelections[rowIndex][day]
              }
            />
          );
        },
      })),
    ];
    setColumns(newColumns);
  }, [selectedWeek, userTimes, dropdownSelections]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const saveTableAsJSON = (event) => {
    event.preventDefault();
    const rowData = data.map((row, rowIndex) => {
      let updatedRow = { ...row };
      selectedWeek.forEach((weekItem) => {
        const day = weekItem["date"];

        ///error will be here... I need to add the date...???
        if (dropdownSelections[rowIndex] && dropdownSelections[rowIndex][day]) {
          updatedRow[day] = dropdownSelections[rowIndex][day];
        }
      });

      return updatedRow;
    });
    // console.log("rowData", rowData)
    onSaveData(rowData); // Passing the rowData to the parent component
  };

  useEffect(() => {
    let initialDropdownValues = {};
    data.forEach((_, rowIndex) => {
      initialDropdownValues[rowIndex] = {};
      selectedWeek.forEach((item) => {
        const day = item["date"];
        initialDropdownValues[rowIndex][day] = "NONE";
      });
    });
    setDropdownSelections(initialDropdownValues);
  }, [data, selectedWeek]);

  return (
    <div className="tableSchedulerContainer">
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 2px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ padding: "10px", border: "solid 1px gray" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {formIsValid ? (
        <button
          className="af-button"
          onClick={saveTableAsJSON}
          style={{
            marginLeft: "1%",
            marginRight: "1%",
            width: "98%",
            height: "50px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Review Changes
        </button>
      ) : (
        <button
          className="af-button"
          onClick={(e) => e.preventDefault()}
          style={{
            width: "98%",
            height: "50px",
            backgroundColor: "yellow",
            color: "black",
            disabled: "true",
          }}
        >
          Errors in Form
        </button>
      )}
    </div>
  );
};

export default FormSchedulerTable;
