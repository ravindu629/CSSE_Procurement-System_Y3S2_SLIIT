import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function SitesBudgetAllocations() {
  const [sites, setSites] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    function getSites() {
      axios
        .get("http://localhost:5000/api/sites")
        .then((res) => {
          setSites(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSites();
  }, []);

  return (
    <div className="">
      <div className="registerTitle">
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/approvedOrders");
          }}
        >
          Approved Orders
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/pendingOrders");
          }}
        >
          Pending Orders
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/rejectedOrders");
          }}
        >
          Rejected Orders
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/budgetAllocations");
          }}
        >
          Sites Budget Allocation
        </button>
      </div>
      <div className="staffTable">
        <h4 className="registerTitle">Each Site Budget Allocation Details</h4>

        <div className="">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Site Name</th>
                  <th scope="col">Budget (Rs)</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End date</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {sites.map((site, index) => {
                  return (
                    <tr key={site._id}>
                      <td>{index + 1}</td>
                      <td>{site.name}</td>
                      <td
                        style={{
                          fontSize: "140%",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {site.budget}.00
                      </td>
                      <td>{site.startDate}</td>
                      <td>{site.endDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitesBudgetAllocations;
