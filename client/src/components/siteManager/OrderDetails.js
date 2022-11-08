import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "../forms.css";

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState("");

  let navigate = useNavigate();

  const { staffId } = useParams();
  const { orderNo } = useParams();
  const { site } = useParams();

  useEffect(() => {
    function getOrders() {
      axios
        .get("http://localhost:5000/api/orders")
        .then((res) => {
          const allOrders = res.data;

          const siteOrders = allOrders.filter((order) => {
            return (
              order.staffId === staffId &&
              order.orderNo === orderNo &&
              order.site === site
            );
          });

          siteOrders.shift();

          setOrders(siteOrders);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOrders();
  }, []);

  function deleteOrder(_id) {
    axios
      .delete("http://localhost:5000/api/orders/" + _id)
      .then((res) => {
        alert("Order deleted");
      })
      .catch((err) => {
        alert(err);
      });
    setOrders(orders.filter((order) => order._id !== _id));
  }

  let sum = 0;

  function chooseSupplier() {
    const order_status = {
      staffId: staffId,
      orderNo: orderNo,
      site: site,
      total: total,
      status: "Approved",
    };

    axios
      .post("http://localhost:5000/api/orderStatus", order_status)
      .then(() => {
        alert("Order automatically approved");
        navigate(`/suppliers`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function requestApproval() {
    const order_status = {
      staffId: staffId,
      orderNo: orderNo,
      site: site,
      total: total,
      status: "Pending",
    };

    axios
      .post("http://localhost:5000/api/orderStatus", order_status)
      .then(() => {
        alert("Request send to procument department");
        navigate(`/orderDetails/${staffId}/${orderNo}/${site}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <div className="">
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
        <h4 className="registerTitle">Order Details</h4>
        <div className="orderDetailsTable">
          <table class="table table-bordered table-success table-striped">
            <tbody>
              <tr>
                <td>Site Manager Staff ID</td>
                <td style={{ color: "IndianRed" }}>{staffId}</td>
              </tr>
              <tr>
                <td>Order Number</td>
                <td style={{ color: "IndianRed" }}>{orderNo}</td>
              </tr>
              <tr>
                <td>Site</td>
                <td style={{ color: "IndianRed" }}>{site}</td>
              </tr>
              <tr>
                <td>
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg"
                    onClick={() => {
                      let sum = 0;

                      orders.forEach((ord) => {
                        sum += Number(ord.itemPrice) * Number(ord.quantity);
                      });

                      setTotal(sum);
                    }}
                  >
                    Calculate Total Amount
                  </button>
                </td>
                <td>
                  <h2>
                    {total > 100000 ? (
                      <b style={{ fontWeight: "600", color: "red" }}>
                        Rs.{total}.00
                      </b>
                    ) : (
                      <b style={{ fontWeight: "600", color: "green" }}>
                        Rs.{total}.00
                      </b>
                    )}
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="requestButtons">
          {total > 100000 ? (
            <button
              type="button"
              class="btn btn-dark btn-lg orderBtn"
              onClick={requestApproval}
            >
              Request Approval
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-dark btn-lg orderBtn"
              onClick={chooseSupplier}
            >
              Select Supplier
            </button>
          )}

          <button
            type="button"
            class="btn btn-danger btn-lg orderBtn"
            onClick={() => {
              navigate(`/orderStatusCheck/${staffId}/${orderNo}/${site}`);
            }}
          >
            Order Status
          </button>
        </div>

        <div className="orderTable">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Item</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Quantity</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {orders.map((order, index) => {
                  return (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.item}</td>
                      <td>{order.itemPrice}</td>
                      <td>{order.quantity}</td>

                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-md orderBtn"
                          onClick={() => {
                            navigate(`/updateOrder/${order._id}`);
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
                              deleteOrder(order._id);
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

export default OrderDetails;
