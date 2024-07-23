import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import AdminAnalysisPage from "./components/AdminAnalysisPage.jsx";
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

//멘토링
const BeforeMatchingPage = React.lazy(
  () => import("./components/BeforeMatchingPage.jsx"),
);
const AfterMatchingPage = React.lazy(
  () => import("./components/AfterMatchingPage.jsx"),
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
const VacationPage = React.lazy(() => import("./components/VacationPage.jsx"));
const VacationOverviewPage = React.lazy(
  () => import("./components/VacationOverviewPage.jsx"),
);
const VacationRequestPage = React.lazy(
  () => import("./components/VacationRequestPage.jsx"),
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
            path="/beforementoring/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BeforeMatchingPage />
              </Suspense>
            }
          />
          <Route
            path="/aftermentoring/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AfterMatchingPage />
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
          <Route
            path="/vacation"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VacationPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation/overview"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VacationOverviewPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VacationPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation/request"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VacationRequestPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
