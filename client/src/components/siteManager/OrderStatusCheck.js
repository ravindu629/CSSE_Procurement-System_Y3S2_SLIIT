import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import { useNavigate } from "react-router-dom";
import "../forms.css";

function OrderStatusCheck() {
  const [orderStatus, setOrderStatus] = useState([]);

  let navigate = useNavigate();

  const { staffId } = useParams();
  const { orderNo } = useParams();
  const { site } = useParams();

  useEffect(() => {
    function getOrderStatus() {
      axios
        .get("http://localhost:5000/api/orderStatus")
        .then((res) => {
          const allOrders = res.data;

          const siteOrders = allOrders.filter((order) => {
            return (
              order.staffId === staffId &&
              order.orderNo === orderNo &&
              order.site === site
            );
          });

          setOrderStatus(siteOrders);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOrderStatus();
  }, []);

  return (
    <div className="">
      <div className="container">
        <h4 className="registerTitle">Orders Status</h4>
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

export default OrderStatusCheck;
