import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [useCases, setUseCases] = useState([]);
  const [filters, setFilters] = useState({
    lifecycle_stage: '',
    risk_category: '',
    use_case_category: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/usecases').then((res) => {
      setUseCases(res.data);
    });
  }, []);

  const filtered = useCases.filter((uc) =>
    (filters.lifecycle_stage === '' || uc.lifecycle_stage === filters.lifecycle_stage) &&
    (filters.risk_category === '' || uc.risk_category === filters.risk_category) &&
    (filters.use_case_category === '' || uc.use_case_category === filters.use_case_category)
  );

  return (
    <div className="dashboard-container">
      
      {/* HEADER */}
      <div className="dashboard-header-box">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-actions">
          <button onClick={() => navigate('/add')}>Add</button>
          <button onClick={() => navigate('/edit')}>Edit</button>
          <button onClick={() => navigate('/delete')}>Delete</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">

        {/* FILTERS */}
        <div className="filter-row">
          <select onChange={(e) => setFilters({ ...filters, lifecycle_stage: e.target.value })}>
            <option value="">All Stages</option>
            <option>Idea</option>
            <option>Development</option>
            <option>Testing</option>
            <option>Production</option>
            <option>Retired</option>
          </select>

          <select onChange={(e) => setFilters({ ...filters, risk_category: e.target.value })}>
            <option value="">All Risks</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* CARD GRID */}
        <div className="usecase-grid">
          {filtered.map((uc) => (
            <div
              key={uc.id}
              className="usecase-card"
              onClick={() => navigate(`/usecase/${uc.id}`)}
            >
              <div className="card-title">{uc.title}</div>
              <div className="card-description">
                {uc.description.length > 120
                  ? uc.description.slice(0, 120) + '...'
                  : uc.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
