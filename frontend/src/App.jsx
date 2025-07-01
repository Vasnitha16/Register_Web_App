import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import AddUseCase from './AddUseCase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/add" element={<AddUseCase />} />
      </Routes>
    </Router>
  );
}

export default App;
