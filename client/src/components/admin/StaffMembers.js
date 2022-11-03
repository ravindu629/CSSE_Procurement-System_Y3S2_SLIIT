import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function StaffMembers() {
  const [staffMembers, setStaffMembers] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    function getStaffMembers() {
      axios
        .get("http://localhost:5000/api/staffMembers")
        .then((res) => {
          setStaffMembers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getStaffMembers();
  }, []);

  function deleteStaffMember(_id) {
    axios
      .delete("http://localhost:5000/api/staffMembers/" + _id)
      .then((res) => {
        alert("Staff member deleted");
      })
      .catch((err) => {
        alert(err);
      });
    setStaffMembers(staffMembers.filter((member) => member._id !== _id));
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
        <h4 className="registerTitle">All Staff Members</h4>

        <div className="">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">First Name</th>
                  <th scope="col">last Name</th>
                  <th scope="col">Staff ID</th>
                  <th scope="col">Type</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {staffMembers.map((staffMember, index) => {
                  return (
                    <tr key={staffMember._id}>
                      <td>{index + 1}</td>
                      <td>{staffMember.fName}</td>
                      <td>{staffMember.lName}</td>
                      <td>{staffMember.staffId}</td>
                      <td>{staffMember.type}</td>
                      <td>{staffMember.email}</td>
                      <td>{staffMember.phoneNumber}</td>

                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-md orderBtn"
                          onClick={() => {
                            navigate(`/updateStaffMember/${staffMember._id}`);
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
                              deleteStaffMember(staffMember._id);
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

export default StaffMembers;
