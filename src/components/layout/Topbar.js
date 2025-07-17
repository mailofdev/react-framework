import React from "react";
import routes from "../navigation/Routes";

const Topbar = ({
  showSearch = true,
  showNavMenu = true,
  showUserMenu = true,
}) => {
  const handleRouteClick = (item) => {
    console.log("Button clicked:", item);

    if (item.label === "Logout") {
      // TODO: call logout API
      console.log("Triggering logout API...");
    } else {
      // Simulate navigation or any logic
      console.log("Navigating to:", item.href);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm sticky-top fixed-top">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center fw-bold" href="#">
          MyApp
        </a>

        {/* Toggle button for mobile sidebar */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left nav menu */}
          {showNavMenu && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {routes
                .filter((item) => item.showIn?.includes("topbar"))
                .map((item, idx) => (
                  <li className="nav-item" key={idx}>
                    <a
                      className={`nav-link d-flex align-items-center px-3 py-2 ${
                        item.active ? "active" : ""
                      } ${item.danger ? "text-danger" : ""}`}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRouteClick(item);
                      }}
                    >
                      {item.icon && <i className={`bi ${item.icon} me-2`}></i>}
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          )}

          {/* Search form */}
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

          {/* Right User menu */}
          {showUserMenu && (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
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
                  <span>User</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRouteClick({ label: "Logout" });
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Custom hover/active styling */}
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
          border-bottom: 2px solid white;
        }
      `}</style>
    </nav>
  );
};

export default Topbar;
