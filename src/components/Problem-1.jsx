import React, { useEffect, useState } from "react";
import SingleData from "./SingleData";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [problem1Data, setProblem1Data] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };
  //form submit handler function
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { name: name, status: status };
    if (name && status) {
      setProblem1Data((prev) => [...prev, newData]);
      setName("");
      setStatus("");
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                required
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          {/* show if user submit empty field */}
          {error && <div className="error">{error}</div>}
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
              {problem1Data &&
                problem1Data
                  .filter((data) => data.status === show || show === "all")
                  .sort((a, b) => {
                    // for sorting first active then completed finally other valued as 1,2,3
                    const order = { active: 1, completed: 2 };
                    const statusA = order[a.status] || 3;
                    const statusB = order[b.status] || 3;

                    return statusA - statusB;
                  })
                  .map((data) => <SingleData key={data.name} data={data} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
