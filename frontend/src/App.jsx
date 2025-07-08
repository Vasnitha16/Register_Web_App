import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import AddUseCase from './AddUseCase';
import UseCaseDetails from './UseCaseDetails';
import EditUseCase from './EditUseCase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/add" element={<AddUseCase />} />
        <Route path="/usecase/:id" element={<UseCaseDetails />} />
        <Route path="/edit/:id" element={<EditUseCase />} />
      </Routes>
    </Router>
  );
}

export default App;