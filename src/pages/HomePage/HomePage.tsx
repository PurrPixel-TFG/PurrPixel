import React from "react";
import './HomePage.scss';
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Select your Purr to get started!</h1>

      <div className="main-page-buttons-fixed">
        <Link to="/settings" className="main-page-button">Settings</Link>
        <Link to="/profile" className="main-page-button">Profile</Link>
        <Link to="/store" className="main-page-button">Store</Link>
        <Link to="/games" className="main-page-button">Games</Link>
      </div>

      <div className="container_cats">
        <div className="cat_1">Cat 1</div>
        <div className="cat_2">Cat 2</div>
        <div className="cat_3">Cat 3</div>
        <div className="cat_4">Cat 4</div>
      </div>

      <div className="container_cats_status">
        <div className="status_cat_1">Status Cat 1</div>
        <div className="status_cat_2">Status Cat 2</div>
        <div className="status_cat_3">Status Cat 3</div>
        <div className="status_cat_4">Status Cat 4</div>
      </div>

    </>
  );
};

export default HomePage;
