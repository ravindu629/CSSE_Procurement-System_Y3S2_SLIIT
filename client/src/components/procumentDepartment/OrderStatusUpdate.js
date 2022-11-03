import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

function OrderStatusUpdate() {
  const [orderStatus, setOrderStatus] = useState({
    staffId: "",
    orderNo: "",
    site: "",
    total: "",
    status: "",
  });

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    function getOrderStatus() {
      axios
        .get(`http://localhost:5000/api/orderStatus/${id}`)
        .then((res) => {
          setOrderStatus(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOrderStatus();
  }, []);

  function updateData(e) {
    e.preventDefault();

    const updatedOrderStatus = orderStatus;

    axios
      .put(`http://localhost:5000/api/orderStatus/${id}`, updatedOrderStatus)
      .then(() => {
        alert("Order status updated");
        navigate(`/pendingOrders`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setOrderStatus((preValue) => {
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

      <h4 className="registerTitle">Update Order Status</h4>
      <form onSubmit={updateData} className="registerForm">
        <div className="form-group">
          <label for="exampleInputEmail1">Staff ID</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="staffId"
            value={orderStatus.staffId}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Order Number</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="orderNo"
            value={orderStatus.orderNo}
            onChange={handleChange}
            disabled
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
              value={orderStatus.site}
              onChange={handleChange}
              name="site"
              disabled
            >
              <option selected={orderStatus.site === "Kandy"} value="Kandy">
                Kandy
              </option>
              <option selected={orderStatus.site === "Matara"} value="Matara">
                Matara
              </option>
              <option selected={orderStatus.site === "Colombo"} value="Colombo">
                Colombo
              </option>
              <option selected={orderStatus.site === "Jaffna"} value="Jaffna">
                Jaffna
              </option>
              <option
                selected={orderStatus.site === "Kurunegala"}
                value="Kurunegala"
              >
                Kurunegala
              </option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Total (Rs)</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            name="total"
            value={orderStatus.total}
            onChange={handleChange}
            disabled
          />
        </div>

        <div class="form-group row">
          <label for="fac" className="col-sm-2 col-form-label">
            Order Status
          </label>
          <div className="col-sm-10">
            <select
              id="fac"
              class="form-control"
              value={orderStatus.status}
              onChange={handleChange}
              name="status"
            >
              <option
                selected={orderStatus.status === "Approved"}
                value="Approved"
              >
                Approved
              </option>
              <option
                selected={orderStatus.status === "Pending"}
                value="Pending"
              >
                Pending
              </option>
              <option
                selected={orderStatus.status === "Rejected"}
                value="Rejected"
              >
                Rejected
              </option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-dark btn-lg">
          Update
        </button>
      </form>
    </div>
  );
}

export default OrderStatusUpdate;
