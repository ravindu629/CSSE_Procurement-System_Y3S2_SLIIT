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
        Add Items for Order No :{" "}
        <h2 style={{ color: "red", fontWeight: "bold" }}>{order.orderNo}</h2>
      </h4>
      <form onSubmit={sendData} className="registerForm">
        <div className="form-group">
          <label for="exampleInputEmail1">Staff ID</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="staffId"
            value={order.staffId}
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
            value={order.orderNo}
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
              value={order.site}
              onChange={handleChange}
              name="site"
              disabled
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
        <div className="form-group">
          <label for="exampleInputEmail1">Item</label>
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
