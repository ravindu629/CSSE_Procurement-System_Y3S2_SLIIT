import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../forms.css";

function ProcumentDeptLogin() {
  const [user, setUser] = useState({
    staffId: "",
    password: "",
  });

  let navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/staffMembers/validate", user)
      .then((res) => {
        if (res.status === 200) {
          alert("Procument department staff member validated");

          navigate("/pendingOrders");
        }
      })
      .catch((err) => {
        alert("Login details are invalid, Please try again!!!");
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
    <div className="container">
      <h4 className="registerTitle">Procument Department Login</h4>
      <form onSubmit={sendData} className="loginForm">
        <div className="form-group">
          <label for="exampleInputEmail1">Staff ID</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Staff ID"
            name="staffId"
            value={user.staffId}
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
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg">
          Login
        </button>
      </form>
    </div>
  );
}

export default ProcumentDeptLogin;
