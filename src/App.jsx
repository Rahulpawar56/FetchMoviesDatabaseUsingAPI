import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import MovieDB from "./Components/MovieDB";
import Popular from "./Components/Popular";
import TopRated from "./Components/TopRated";
import Upcoming from "./Components/Upcoming";
import CastDetails from "./Components/CastDetails";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

let App = () => {
  return (
    <>
      <div className="container-fluid text-white p-4" style={{ backgroundColor: "black" }}>
        <BrowserRouter>
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              {/* Brand */}
              <NavLink to="/MovieDB" className="navbar-brand fs-3">
                MovieDB
              </NavLink>

              {/* Hamburger Toggle */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Navbar Links */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <NavLink exact to="/Popular" className="nav-link">
                      Popular
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact to="/TopRated" className="nav-link">
                      Top Rated
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact to="/Upcoming" className="nav-link">
                      Upcoming
                    </NavLink>
                  </li>
                </ul>

                {/* Search Bar */}
                <form className="d-flex">
                  <input
                    type="search"
                    className="form-control me-2"
                    placeholder="Search for a movie..."
                    aria-label="Search for a movie"
                  />
                  <NavLink to="#" className="btn btn-info">
                    Search
                  </NavLink>
                </form>
              </div>
            </div>
          </nav>

          {/* Routes */}
          <div className="container mt-4">
            <Routes>
              <Route path="/MovieDB" element={<MovieDB />} />
              <Route path="/Popular" element={<Popular />} />
              <Route path="/TopRated" element={<TopRated />} />
              <Route path="/Upcoming" element={<Upcoming />} />
              <Route path="/movie/:id" element={<CastDetails />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
