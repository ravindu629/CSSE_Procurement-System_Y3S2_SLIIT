import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

function AddItems() {
  const { staffId } = useParams();
  const { orderNo } = useParams();
  const { site } = useParams();

  const [order, setOrder] = useState({
    staffId: "",
    orderNo: "",
    site: "",
    item: "",
    itemPrice: "",
    quantity: "",
  });

  let navigate = useNavigate();

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
          console.log(siteOrders[0]);
          setOrder(siteOrders[0]);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOrders();
  }, []);

  function sendData(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/orders", order)
      .then(() => {
        alert("Item added");
        navigate(`/addItems/${order.staffId}/${order.orderNo}/${order.site}`);
        setOrder({
          staffId: order.staffId,
          orderNo: order.orderNo,
          site: order.site,
          item: "",
          itemPrice: "",
          quantity: "",
        });
      })
      .catch((err) => {
        alert(err);
      });
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
      <h4 className="registerTitle">
        Add Items for Order No : &nbsp;
        <b style={{ color: "red", fontSize: "130%", fontWeight: "700" }}>
          {order.orderNo}
        </b>
      </h4>
      <form onSubmit={sendData} className="registerForm">
        <h3>
          Site: &nbsp;
          <b style={{ color: "blue", fontSize: "105%", fontWeight: "600" }}>
            {order.site}
          </b>
        </h3>
        <h3>
          Site Manager Staff ID: &nbsp;
          <b style={{ color: "blue", fontSize: "105%", fontWeight: "600" }}>
            {order.staffId}
          </b>
        </h3>
        <br />
        <div className="form-group">
          <label for="exampleInputEmail1">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Item Name"
            name="item"
            value={order.item}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Item Price (Rs)</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Item Price"
            name="itemPrice"
            value={order.itemPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Quantity"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddItems;
