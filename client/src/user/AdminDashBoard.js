import React from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";

const AdminDashboard = () => {
  const {
    user: { name, email },
  } = isAutheticated();

  const adminLeftSide = () => (
    <div className="card text-center">
      <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/admin/create/category" className="nav-link text-info">
            Create Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/categories" className="nav-link text-info">
            Manage Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/create/product" className="nav-link text-info">
            Create Products
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/products" className="nav-link text-info">
            Manage Products
          </Link>
        </li>

        <li className="list-group-item">
          <Link to="/admin/orders" className="nav-link text-info">
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
  const adminRightSide = () => (
    <div className="card text-center">
      <h4 className="card-header">Admin Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Name : </span>
          {name}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Email : </span>
          {email}
        </li>
      </ul>
    </div>
  );
  return (
    <div className="row">
      <div className="col-12 hidden-xs hidden-sm">{adminRightSide()}</div>
      <div className="col-sm-12">{adminLeftSide()}</div>
    </div>
  );
};

export default AdminDashboard;
