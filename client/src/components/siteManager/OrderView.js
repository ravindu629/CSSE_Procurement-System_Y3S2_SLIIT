import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function OrderView() {
  const [order, setOrder] = useState({
    staffId: "",
    orderNo: "",
    site: "Kandy",
  });

  let navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    navigate(`/orderDetails/${order.staffId}/${order.orderNo}/${order.site}`);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setOrder((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <div className="registerTitle">
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/addOrder");
          }}
        >
          Add New Order
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/orderView");
          }}
        >
          Each Site Order Details
        </button>
      </div>
      <h4 className="registerTitle">Enter Order Details</h4>
      <form onSubmit={sendData} className="loginForm">
        <div className="form-group">
          <label for="exampleInputEmail1">Staff ID</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Site Manager Staff ID"
            name="staffId"
            value={order.staffId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Order Number</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Order Number"
            name="orderNo"
            value={order.orderNo}
            onChange={handleChange}
            required
          />
        </div>
        <div class="form-group row">
          <label for="fac" className="col-sm-2 col-form-label">
            Site
          </label>
          <div className="col-sm-10">
            <select
              id="fac"
              class="form-control"
              value={order.site}
              onChange={handleChange}
              name="site"
            >
              <option selected={order.site === "Kandy"} value="Kandy">
                Kandy
              </option>
              <option selected={order.site === "Matara"} value="Matara">
                Matara
              </option>
              <option selected={order.site === "Colombo"} value="Colombo">
                Colombo
              </option>
              <option selected={order.site === "Jaffna"} value="Jaffna">
                Jaffna
              </option>
              <option selected={order.site === "Kurunegala"} value="Kurunegala">
                Kurunegala
              </option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-dark btn-lg">
          Check Order Details
        </button>
      </form>
    </div>
  );
}

export default OrderView;
