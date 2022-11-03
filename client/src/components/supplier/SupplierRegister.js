import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SupplierRegister() {
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });

  let navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/suppliers", user)
      .then(() => {
        alert("Successfully registered");
        navigate("/");
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
            navigate("/registerSupplier");
          }}
        >
          Register Supplier
        </button>

        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            //navigate("/supplierLogin");
          }}
        >
          Suplier Login
        </button>
      </div>
      <div className="container">
        <h4 className="registerTitle">Register Supplier</h4>
        <form onSubmit={sendData} className="registerForm">
          <div className="form-group">
            <label for="exampleInputEmail1">Company Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Company Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Address"
              name="address"
              value={user.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email Address"
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
              placeholder="Enter Phone number"
              name="phone"
              value={user.phone}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SupplierRegister;
