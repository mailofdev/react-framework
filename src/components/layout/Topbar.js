import React from "react";
import routes from "../navigation/Routes";
import { Link, useLocation } from "react-router-dom";

const Topbar = ({
  showSearch = true,
  showNavMenu = true,
  showUserMenu = true,
}) => {
  const location = useLocation();

  const handleRouteClick = (item) => {
    console.log("Button clicked:", item);

    if (item.label === "Logout") {
      // TODO: call logout API
      console.log("Triggering logout API...");
    } else {
      console.log("Navigating to:", item.href);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm sticky-top fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand */}
        <Link to="/" className="navbar-brand fw-bold">
          MyPortfolio
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center Menu Items */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
          {showNavMenu && (
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {routes
                .filter((item) => item.showIn?.includes("topbar"))
                .map((item, idx) => (
                  <li className="nav-item" key={idx}>
                    <Link
                      to={item.href}
                      className={`nav-link d-flex align-items-center px-3 py-2 ${
                        location.pathname === item.href ? "active" : ""
                      } ${item.danger ? "text-danger" : ""}`}
                      onClick={() => handleRouteClick(item)}
                    >
                      {item.icon && <i className={`bi ${item.icon} me-2`}></i>}
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
        {showSearch && (
            <form className="d-flex me-lg-3 my-2 my-lg-0" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          )}
        {/* Right - User Menu */}
        {showUserMenu && (
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle d-flex align-items-center bg-transparent border-0"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://i.pravatar.cc/30"
                  alt="avatar"
                  className="rounded-circle me-2"
                  width="30"
                  height="30"
                />
                <span className="text-white">User</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <button className="dropdown-item" type="button">Profile</button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">Settings</button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleRouteClick({ label: "Logout" })}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </div>

      {/* Custom Styling */}
      <style jsx="true">{`
        .navbar-nav .nav-link {
          transition: background 0.3s, color 0.3s;
        }

        .navbar-nav .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .navbar-nav .nav-link.active {
          font-weight: 600;
          border-bottom: 2px solid gold;
          color: black;
        }
      `}</style>
    </nav>
  );
};

export default Topbar;
