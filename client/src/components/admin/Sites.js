import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function Sites() {
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

  function deleteSite(_id) {
    axios
      .delete("http://localhost:5000/api/sites/" + _id)
      .then((res) => {
        alert("Site budget details deleted");
      })
      .catch((err) => {
        alert(err);
      });
    setSites(sites.filter((site) => site._id !== _id));
  }

  return (
    <div className="">
      <div className="registerTitle">
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/registerStaffMember");
          }}
        >
          Register Staff Member
        </button>

        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/addBudget");
          }}
        >
          Allocate Budget For Sites
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/allOrders");
          }}
        >
          View All Orders Status
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/sites");
          }}
        >
          Sites Details
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/staffMembers");
          }}
        >
          Staff Members
        </button>
      </div>
      <div className="staffTable">
        <h4 className="registerTitle">All Sites Budget Details</h4>

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

                  <th></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {sites.map((site, index) => {
                  return (
                    <tr key={site._id}>
                      <td>{index + 1}</td>
                      <td>{site.name}</td>
                      <td>{site.budget}.00</td>
                      <td>{site.startDate}</td>
                      <td>{site.endDate}</td>

                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-md orderBtn"
                          onClick={() => {
                            navigate(`/updateSite/${site._id}`);
                          }}
                        >
                          <b>Update</b>
                        </button>

                        <button
                          type="button"
                          class="btn btn-danger btn-md orderBtn"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this record?"
                              )
                            )
                              deleteSite(site._id);
                          }}
                        >
                          <b>Delete</b>
                        </button>
                      </td>
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

export default Sites;
