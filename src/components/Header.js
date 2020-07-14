import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <Link to="/">Home </Link>
      <br />
      <Link to="/signin">Sign In</Link>
    </React.Fragment>
  );
}

export default Header;