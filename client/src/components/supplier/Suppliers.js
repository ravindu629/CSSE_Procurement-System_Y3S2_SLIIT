import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    function getSuppliers() {
      axios
        .get("http://localhost:5000/api/suppliers")
        .then((res) => {
          setSuppliers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSuppliers();
  }, []);

  return (
    <div className="">
      <div className="staffTable">
        <h4 className="registerTitle">Available Suppliers</h4>

        <div className="">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Comany Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {suppliers.map((sup, index) => {
                  return (
                    <tr key={sup._id}>
                      <td>{index + 1}</td>
                      <td>{sup.name}</td>
                      <td>{sup.address}</td>
                      <td>{sup.email}</td>
                      <td>{sup.phone}</td>

                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-md orderBtn"
                          onClick={() => {
                            navigate(`/addDelivery`);
                          }}
                        >
                          <b>Select Supplier</b>
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

export default Suppliers;
