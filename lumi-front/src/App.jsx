import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
const DashboardPage = React.lazy(
  () => import("./components/DashboardPage.jsx"),
);
const LoginPage = React.lazy(() => import("./components/LoginPage"));
const PlatformPage = React.lazy(() => import("./components/PlatformPage"));
const ChattingPage = React.lazy(() => import("./components/ChattingPage.jsx"));
const MyAttendancePage = React.lazy(
  () => import("./components/MyAttendancePage.jsx"),
);
const ApprovalPage = React.lazy(
  () => import("./components/approval/ApprovalPage.jsx"),
);
const CalendarPage = React.lazy(() => import("./components/CalendarPage.jsx"));
const AdminDepartmentsPage = React.lazy(
  () => import("./components/AdminDepartmentsPage.jsx"),
);
const SignUp = React.lazy(() => import("./components/SignUp.jsx"));
const AdminRecruitmentPage = React.lazy(
  () => import("./components/AdminRecruitmentPage.jsx"),
);

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/attendance"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyAttendancePage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/approval"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ApprovalPage />
              </Suspense>
            }
          />
          <Route
            path="/platform"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PlatformPage />
              </Suspense>
            }
          />
          <Route
            path="/chatting"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ChattingPage />
              </Suspense>
            }
          />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CalendarPage />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/admin/departments"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminDepartmentsPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/recruitment"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminRecruitmentPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
