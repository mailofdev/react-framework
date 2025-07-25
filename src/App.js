import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./features/dashboard/Dashboard";
import Projects from "./features/projects/Projects";
import ContactMe from "./features/contactMe/ContactMe";
import NotFound from "./features/errors/NotFound";
import "./App.css";
import Skills from "./features/skills/Skills";
function App() {
  return (
    <Router>
      <MainLayout config={{ showTopbar: true, showSidebar: false, showFooter: false }}>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contactme" element={<ContactMe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
