import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddDelivery() {
  const [delivery, setDelivery] = useState({
    site: "Kandy",
    address: "",
    date: "",
    phone: "",
    orderNo: "",
  });

  let navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/deliveries", delivery)
      .then(() => {
        alert("delivery added");
        navigate("/addOrder");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setDelivery((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <h4 className="registerTitle">Add New Delivery</h4>
      <form onSubmit={sendData} className="registerForm">
        <div class="form-group row">
          <label for="fac" className="col-sm-2 col-form-label">
            Site
          </label>
          <div className="col-sm-10">
            <select
              id="fac"
              class="form-control"
              value={delivery.site}
              onChange={handleChange}
              name="site"
            >
              <option selected={delivery.site === "Kandy"} value="Kandy">
                Kandy
              </option>
              <option selected={delivery.site === "Matara"} value="Matara">
                Matara
              </option>
              <option selected={delivery.site === "Colombo"} value="Colombo">
                Colombo
              </option>
              <option selected={delivery.site === "Jaffna"} value="Jaffna">
                Jaffna
              </option>
              <option
                selected={delivery.site === "Kurunegala"}
                value="Kurunegala"
              >
                Kurunegala
              </option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Site Manager Address"
            name="address"
            value={delivery.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group row">
          <label for="date_" className="col-sm-2 col-form-label">
            Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="date_"
              name="date"
              onChange={handleChange}
              value={delivery.date}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Phone Number </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Item Name"
            name="phone"
            value={delivery.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Order Number</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Item Price"
            name="orderNo"
            value={delivery.orderNo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default AddDelivery;
