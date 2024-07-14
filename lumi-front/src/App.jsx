function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={
            <Suspense fallback={<div>Loading...</div>}>
              <DashboardPage />
            </Suspense>
          } />
          <Route path="/attendance" element={
            <Suspense fallback={<div>Loading...</div>}>
              <MyAttendancePage />
            </Suspense>
          } />
          <Route path="/login" element={
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          } />
          <Route path="/approval" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ApprovalPage />
            </Suspense>
          } />
          <Route path="/platform" element={
            <Suspense fallback={<div>Loading...</div>}>
              <PlatformPage />
            </Suspense>
          } />
          <Route path="/chatting" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChattingPage />
            </Suspense>
          } />
          <Route path="/calendar" element={
            <Suspense fallback={<div>Loading...</div>}>
              <CalendarPage />
            </Suspense>
          } />
          <Route path="/signup" element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignUp />
            </Suspense>
          } />
          <Route path="/admin/departments" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminDepartmentsPage />
            </Suspense>
          } />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;