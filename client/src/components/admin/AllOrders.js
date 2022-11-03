import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../forms.css";

function AllOrders() {
  const [orderStatus, setOrderStatus] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    function getOrderStatus() {
      axios
        .get("http://localhost:5000/api/orderStatus")
        .then((res) => {
          setOrderStatus(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOrderStatus();
  }, []);

  function deleteOrderStatus(_id) {
    axios
      .delete("http://localhost:5000/api/orderStatus/" + _id)
      .then((res) => {
        alert("Order Status deleted");
      })
      .catch((err) => {
        alert(err);
      });
    setOrderStatus(orderStatus.filter((ord) => ord._id !== _id));
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
      <div className="container">
        <h4 className="registerTitle">All Orders Details</h4>
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
                          class="btn btn-danger btn-md orderBtn"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this record?"
                              )
                            )
                              deleteOrderStatus(order._id);
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

export default AllOrders;
