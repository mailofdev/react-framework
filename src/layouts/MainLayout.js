import React from 'react';
import layoutConfig from '../config/layout';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children, config }) => {
  // Allow per-page override
  const cfg = { ...layoutConfig, ...config };

  return (
    <div className="d-flex flex-column min-vh-100">
      {cfg.showTopbar && <Topbar showSearch={false} showNavMenu={true} showUserMenu={true} />}
      <div className="container-fluid flex-grow-1">
        <div className="row">
          {cfg.showSidebar && (
            <Sidebar />
          )}
          <main className={cfg.showSidebar ? "col-md-10 ms-sm-auto px-4" : "col-12 px-4"}>
            {children}
          </main>
        </div>
      </div>
      {cfg.showFooter && <Footer />}
    </div>
  );
};

export default MainLayout; 