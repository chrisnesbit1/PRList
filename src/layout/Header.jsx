// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <>
      <h1>PRList
        <span>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="hamburger floatRight">☰</label>
          <ul className="menu">
            <li><a href="/">PRs</a></li>
            <li><a href="/bout">About</a></li>
          </ul>
        </span>
      </h1>
    </>
  );
}
