import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import PlatformPage from './components/PlatformPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/platform" element={<PlatformPage />} />
    </Routes>
  );
}

export default App;