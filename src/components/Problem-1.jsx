import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tableData, setTableData] = useState([]);
  const [tableSortData, setTableSortData] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const handleClick = (val) => {
    setShow(val);
    if (val === "all") {
      const sortedData = tableData.sort((a, b) => {
        if (
          a.status.toLowerCase() === "active" &&
          b.status.toLowerCase() !== "active"
        ) {
          return -1;
        } else if (
          a.status.toLowerCase() === "completed" &&
          b.status.toLowerCase() !== "active" &&
          b.status.toLowerCase() !== "completed"
        ) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log(sortedData);
    } else {
      const filteredData = tableData.filter(
        (item) => item.status && item.status.toLowerCase() === val.toLowerCase()
      );
      console.log(filteredData);
      // let tempData=filteredData;
      // tempData.push(filteredData)
      // setTableData(tempData)
    }
  };

  // name input
  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  //   status input
  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };
  // form submit
  const submitForm = () => {
    event.preventDefault();
    const newFormData = {
      name: nameValue,
      status: statusValue,
    };
    setTableData([...tableData, newFormData]);
    // Reset the form inputs
    setNameValue("");
    setStatusValue("");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={submitForm}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                value={nameValue}
                onChange={handleNameChange}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                value={statusValue}
                onChange={handleStatusChange}
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
