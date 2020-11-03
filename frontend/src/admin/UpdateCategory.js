import React, { useState, useEffect } from "react";
import { getaCategory, updateCategory } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      if (data.error) {
        setError({ error: data.error });
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
    updateCategory(
      match.params.categoryId,
      user._id,
      token,
      JSON.stringify({ name })
    ).then((data) => {
      if (data.error) {
        setError(data.error);
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
          Category has been updated successfully
        </h4>
      );
    }
  };
  const errorMessage = () => {
    console.log(error);
    if (error) {
      return (
        <h4 className="text-danger text-center">
          Category has not been updated.
        </h4>
      );
    }
  };

  const updateCategoryForm = () => {
    return (
      <form action="">
        <div className="form-group p-3">
          <p className="lead">Enter the category</p>
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
    <Base title="Update a category" className="container bg-success p-4">
      <div className="row bg-light rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
