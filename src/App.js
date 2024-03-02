import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Sorting from "./components/Sorting";
import PathFinding from "./components/PathFinding";

function App() {
  return (
    <>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-link align--left">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/sorting" className="link">
              Sorting
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/pathfinding" className="link">
              Path Finding
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>HELLO</h1>} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/pathfinding" element={<PathFinding />} />
      </Routes>
      <footer className="footer-section">
        <p>
          Made by <a href="github.com/cmdsiraj">SIRAJ</a>
        </p>
      </footer>
    </>
  );
}

export default App;
