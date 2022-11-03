import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

function UpdateStaffMember() {
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    staffId: "",
    type: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    function getUser() {
      axios
        .get(`http://localhost:5000/api/staffMembers/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getUser();
  }, []);

  function updateData(e) {
    e.preventDefault();

    const updatedUser = user;

    axios
      .put(`http://localhost:5000/api/staffMembers/${id}`, updatedUser)
      .then(() => {
        alert("Staff member updated");
        navigate(`/staffMembers`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  return (
    <div>
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
      <div className="container">
        <h4 className="registerTitle">Update Staff Member</h4>
        <form onSubmit={updateData} className="registerForm">
          <div className="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="fName"
              value={user.fName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="lName"
              value={user.lName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Staff ID</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="staffId"
              value={user.staffId}
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group row">
            <label for="fac" className="col-sm-2 col-form-label">
              Type
            </label>
            <div className="col-sm-10">
              <select
                id="fac"
                class="form-control"
                value={user.type}
                onChange={handleChange}
                name="type"
              >
                <option selected={user.type === "Admin"} value="Admin">
                  Admin
                </option>
                <option
                  selected={user.type === "Site Manager"}
                  value="Site Manager"
                >
                  Site Manager
                </option>
                <option
                  selected={user.type === "Procument Department"}
                  value="Procument Department"
                >
                  Procument Department
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStaffMember;
