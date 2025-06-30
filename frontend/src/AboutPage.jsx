import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';
import aboutVisual from './assets/Login.png'; // image of hands holding drinks

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="navbar">
        <div className="navbar-center">AIforU</div>
        <div className="navbar-right">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </div>

      <div className="about-card">
        <div className="about-left">
          <h1>ABOUT US</h1>
          <p>
            Welcome to AIforU a modern and secure user registration platform designed to simplify how users sign up and manage their profiles.
          </p>
        </div>
        <div className="about-right">
          <img src={aboutVisual}  />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
