import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <h1><Link to="/">PRList</Link>
        <span className="float-right">
            <Link to="/">Pull Requests</Link>
            <Link to="/about">About</Link>
        </span>
      </h1>
    </div>
  );
}
