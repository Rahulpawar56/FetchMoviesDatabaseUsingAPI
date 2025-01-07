import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import MovieDB from "./Components/MovieDB";
import Popular from "./Components/Popular";
import TopRated from "./Components/TopRated";
import Upcoming from "./Components/Upcoming";
import CastDetails from "./Components/CastDetails";
import Search from "./Components/Search";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

let App = () => {
  const [search, setSearch] = useState("");
  function handleChange(e) {
    setSearch(e.target.value);
  }

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
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                    onChange={handleChange}
                    placeholder="Search for a movie..."
                    aria-label="Search"
                  />
                  <NavLink to="/Search" className="btn btn-info">
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
              <Route path="/Search" element={<Search search={search} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
