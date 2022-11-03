import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

function UpdateSite() {
  const [site, setSite] = useState({
    name: "Kandy",
    budget: "",
    startDate: "",
    endDate: "",
  });

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    function getSite() {
      axios
        .get(`http://localhost:5000/api/sites/${id}`)
        .then((res) => {
          setSite(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSite();
  }, []);

  function updateData(e) {
    e.preventDefault();

    const updatedSite = site;

    axios
      .put(`http://localhost:5000/api/sites/${id}`, updatedSite)
      .then(() => {
        alert("Site budget details updated");
        navigate(`/sites`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setSite((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  return (
    <div>
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
        <h4 className="registerTitle">Update Site budget Details</h4>
        <form onSubmit={updateData} className="registerForm">
          <div class="form-group row">
            <label for="fac" className="col-sm-2 col-form-label">
              Site
            </label>
            <div className="col-sm-10">
              <select
                id="fac"
                class="form-control"
                value={site.name}
                onChange={handleChange}
                name="name"
              >
                <option selected={site.name === "Kandy"} value="Kandy">
                  Kandy
                </option>
                <option selected={site.name === "Matara"} value="Matara">
                  Matara
                </option>
                <option selected={site.name === "Colombo"} value="Colombo">
                  Colombo
                </option>
                <option selected={site.name === "Jaffna"} value="Jaffna">
                  Jaffna
                </option>
                <option
                  selected={site.name === "Kurunegala"}
                  value="Kurunegala"
                >
                  Kurunegala
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Amount (Rs.)</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              name="budget"
              value={site.budget}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group row">
            <label for="date_" className="col-sm-2 col-form-label">
              Start Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="date_"
                name="startDate"
                onChange={handleChange}
                value={site.startDate}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="date_" className="col-sm-2 col-form-label">
              End Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="date_"
                name="endDate"
                onChange={handleChange}
                value={site.endDate}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-dark btn-lg">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateSite;
