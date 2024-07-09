import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import DashboardPage from "./components/DashboardPage.jsx";
// import LoginPage from './components/LoginPage';
// import PlatformPage from './components/PlatformPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/*<Route path="/login" element={<LoginPage />} />*/}
        {/*<Route path="/platform" element={<PlatformPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
