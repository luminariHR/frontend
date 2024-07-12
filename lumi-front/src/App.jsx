import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import DashboardPage from "./components/DashboardPage.jsx";
import LoginPage from "./components/LoginPage";
import PlatformPage from "./components/PlatformPage";
import ChattingPage from "./components/ChattingPage.jsx";
import MyAttendancePage from "./components/MyAttendancePage.jsx";
import CalendarPage from "./components/CalendarPage.jsx";
import AdminDepartmentsPage from "./components/AdminDepartmentsPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attendance" element={<MyAttendancePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/chatting" element={<ChattingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
