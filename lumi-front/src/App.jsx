import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import AdminAnalysisPage from "./components/AdminAnalysisPage.jsx";
import OrgChartPage from "./components/org-chart/OrgChartPage.jsx";
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
const ApprovalDetails = React.lazy(
  () => import("./components/approval/ApprovalDetails.jsx"),
);
const CalendarPage = React.lazy(() => import("./components/CalendarPage.jsx"));
const AdminDepartmentsPage = React.lazy(
  () => import("./components/AdminDepartmentsPage.jsx"),
);
const SignUp = React.lazy(() => import("./components/SignUp.jsx"));
const AdminRecruitmentPage = React.lazy(
  () => import("./components/AdminRecruitmentPage.jsx"),
);
const MentoringPage = React.lazy(
  () => import("./components/MentoringPage.jsx"),
);
const MyProfile = React.lazy(() => import("./components/MyProfile.jsx"));
const AdminAttendancePage = React.lazy(
  () => import("./components/AdminAttendancePage.jsx"),
);
const AdminAttendanceDetailPage = React.lazy(
  () => import("./components/AdminAttendanceDetailPage.jsx"),
);
const AdminUsersPage = React.lazy(
  () => import("./components/AdminUsersPage.jsx"),
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
            path="org-chart"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <OrgChartPage />
              </Suspense>
            }
          />
          <Route
            path="approval/details/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ApprovalDetails />
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
            exact
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
            path="/mentoring"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MentoringPage />
              </Suspense>
            }
          />
          <Route
            path="/myProfile"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyProfile />
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
          <Route
            path="/admin/recruitment/analysis/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminAnalysisPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminAttendancePage />
              </Suspense>
            }
          />
          <Route
            path="/admin/attendance/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminAttendanceDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminUsersPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
