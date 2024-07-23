import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import AdminAnalysisPage from "./components/AdminAnalysisPage.jsx";
import OrgChartPage from "./components/org-chart/OrgChartPage.jsx";
import { LoadingPage } from "./components/LoadingPage.jsx";
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
const VacationPage = React.lazy(
  () => import("./components/vacation/VacationPage.jsx"),
);
const VacationOverviewPage = React.lazy(
  () => import("./components/vacation/VacationOverviewPage.jsx"),
);
const VacationRequestPage = React.lazy(
  () => import("./components/vacation/VacationRequestPage.jsx"),
);
const VacationRequestDetailPage = React.lazy(
  () => import("./components/vacation/VacationRequestDetailPage.jsx"),
);
const VacationDetailPage = React.lazy(
  () => import("./components/vacation/VacationDetailPage.jsx"),
);

const DocumentPage = React.lazy(
  () => import("./components/document/DocumentPage.jsx"),
);

const DocumentDetails = React.lazy(
  () => import("./components/document/DocumentDetails.jsx"),
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
              <Suspense fallback={<LoadingPage />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="org-chart"
            element={
              <Suspense fallback={<LoadingPage />}>
                <OrgChartPage />
              </Suspense>
            }
          />
          <Route
            path="approval/details/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ApprovalDetails />
              </Suspense>
            }
          />
          <Route
            path="/attendance"
            element={
              <Suspense fallback={<LoadingPage />}>
                <MyAttendancePage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            exact
            path="/approval"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ApprovalPage />
              </Suspense>
            }
          />
          <Route
            path="/platform"
            element={
              <Suspense fallback={<LoadingPage />}>
                <PlatformPage />
              </Suspense>
            }
          />
          <Route
            path="/chatting"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ChattingPage />
              </Suspense>
            }
          />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<LoadingPage />}>
                <CalendarPage />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<LoadingPage />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/admin/departments"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AdminDepartmentsPage />
              </Suspense>
            }
          />
          <Route
            path="/mentoring"
            element={
              <Suspense fallback={<LoadingPage />}>
                <MentoringPage />
              </Suspense>
            }
          />
          <Route
            path="/myProfile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <MyProfile />
              </Suspense>
            }
          />
          <Route
            path="/admin/recruitment"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AdminRecruitmentPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/recruitment/analysis/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AdminAnalysisPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AdminAttendancePage />
              </Suspense>
            }
          />
          <Route
            path="/admin/attendance/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AdminAttendanceDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AdminUsersPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation"
            element={
              <Suspense fallback={<LoadingPage />}>
                <VacationPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation/overview"
            element={
              <Suspense fallback={<LoadingPage />}>
                <VacationOverviewPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation"
            element={
              <Suspense fallback={<LoadingPage />}>
                <VacationPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation/request"
            element={
              <Suspense fallback={<LoadingPage />}>
                <VacationRequestPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation/details/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VacationRequestDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/vacation/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VacationDetailPage />
              </Suspense>
            }
          />
            <Route
            path="/document"
            element={
                <Suspense fallback={<div>Loading...</div>}>
                    <DocumentPage />
                </Suspense>
            }
        />
            <Route
                path="document/details/:id"
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <DocumentDetails />
                    </Suspense>
                }
            />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
