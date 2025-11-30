import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <h1>PRList
        <span>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="hamburger floatRight">☰</label>
          <ul className="menu">
            {/* server-side routing: <li><a href="/">Pull Requests</a></li> */}
            {/* server-side routing: <li><a href="/about">About</a></li> */}
            <li><Link to="/">Pull Requests</Link></li>
            <li><Link to="/about">About</Link></li>

          </ul>
        </span>
      </h1>
    </>
  );
}
