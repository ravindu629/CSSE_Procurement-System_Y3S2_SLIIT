import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../forms.css";

function PendingOrders() {
  const [orderStatus, setOrderStatus] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    function getOrderStatus() {
      axios
        .get("http://localhost:5000/api/orderStatus")
        .then((res) => {
          const allOrders = res.data;

          const pendingOrders = allOrders.filter((order) => {
            return order.status === "Pending";
          });

          setOrderStatus(pendingOrders);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOrderStatus();
  }, []);

  return (
    <div className="container">
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
        <h4 className="registerTitle">Pending Orders</h4>
        <br />
        <div className="orderStatusTable">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Site Manager ID</th>
                  <th scope="col">Order Number</th>
                  <th scope="col">Site</th>
                  <th scope="col">Total (Rs)</th>
                  <th scope="col">Order Status</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {orderStatus.map((order, index) => {
                  return (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.staffId}</td>
                      <td>{order.orderNo}</td>
                      <td>{order.site}</td>
                      <td>{order.total}.00</td>
                      <td
                        style={{
                          fontSize: "140%",
                          color: "blue",
                          fontWeight: "bold",
                        }}
                      >
                        {order.status}
                      </td>

                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-md orderBtn"
                          onClick={() => {
                            navigate(`/updateOrderStatus/${order._id}`);
                          }}
                        >
                          <b>Change Order Status</b>
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

export default PendingOrders;
