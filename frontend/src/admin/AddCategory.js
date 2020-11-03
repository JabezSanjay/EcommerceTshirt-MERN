import React, { useState } from "react";
import { createCategory } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    setError("");
    setSuccess(false);

    //backend request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success text-center">
          Category has not been created.
        </h4>
      );
    }
  };
  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="text-danger text-center">
          Category has been created successfully
        </h4>
      );
    }
  };

  const addCategoryForm = () => {
    return (
      <form action="">
        <div className="form-group p-3">
          <p className="lead text-white">Enter the category</p>
          <input
            type="text"
            className="form-control my-4"
            autoFocus
            required
            placeholder="Eg: Summer"
            value={name}
            onChange={handleChange}
          />
          <button className="btn btn-outline-success" onClick={onSubmit}>
            Submit
          </button>
          <Link className="btn btn-outline-warning mx-4" to="/admin/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </form>
    );
  };

  return (
    <Base title="Create a category" className="container p-4">
      <div className="row  rounded">
        <div className="col-md-8">
          {successMessage()}
          {errorMessage()}
          {addCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
