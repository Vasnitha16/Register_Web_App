// === React Dashboard Component ===

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from "react-csv";
import { Plus, Edit, Trash, FileDown, Upload } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import Papa from 'papaparse';

function Dashboard() {
  const [useCases, setUseCases] = useState([]);
  const [filters, setFilters] = useState({
    lifecycle_stage: '',
    risk_category: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/usecases')
      .then((res) => setUseCases(res.data))
      .catch((err) => console.error("Error fetching use cases", err));
  }, []);

  const filtered = useCases.filter((uc) =>
    (filters.lifecycle_stage === '' || uc.lifecycle_stage === filters.lifecycle_stage) &&
    (filters.risk_category === '' || uc.risk_category === filters.risk_category)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this use case?")) {
      try {
        await axios.delete(`http://localhost:5000/usecases/${id}`);
        setUseCases((prev) => prev.filter((uc) => uc.use_case_id !== id));
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete use case.");
      }
    }
  };

  const handleCSVUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async function (results) {
      // Transform CSV-friendly headers to backend keys
      const mappedData = results.data.map(row => ({
        title: row["Title"],
        description: row["Description"],
        business_owner: row["Business Owner"],
        ai_model_name: row["AI Model"],
        use_case_category: row["Category"],
        business_area: row["Business Area"],
        risk_category: row["Risk"],
        lifecycle_stage: row["Stage"],
        kpis_impacted: row["KPIs"],
        expected_benefits: row["Benefits"],
        model_details: row["Model Details"]
      }));

      try {
        const response = await axios.post('http://localhost:5000/usecases/bulk', mappedData);
        alert("Bulk upload successful");
        window.location.reload();
      } catch (error) {
        console.error("Bulk upload failed", error.response?.data || error);
        alert("Bulk upload failed");
      }
    }
  });
};

  const csvHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Business Owner", key: "business_owner" },
    { label: "AI Model", key: "ai_model_name" },
    { label: "Category", key: "use_case_category" },
    { label: "Business Area", key: "business_area" },
    { label: "Risk", key: "risk_category" },
    { label: "Stage", key: "lifecycle_stage" },
    { label: "KPIs", key: "kpis_impacted" },
    { label: "Benefits", key: "expected_benefits" },
    { label: "Model Details", key: "model_details" }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-box">
        <h2 className="dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={24} /> Model Dashboard
        </h2>
        <div className="dashboard-actions">
          <button onClick={() => navigate('/add')}>
            <Plus size={16} style={{ marginRight: '6px' }} /> Add
          </button>
          <CSVLink
            data={filtered}
            headers={csvHeaders}
            filename={"use_cases_export.csv"}
            className="btn"
          >
            <FileDown size={16} style={{ marginRight: '6px' }} /> Export CSV
          </CSVLink>
          <label className="btn upload-btn">
            <Upload size={16} style={{ marginRight: '6px' }} /> Upload CSV
            <input type="file" accept=".csv" onChange={handleCSVUpload} hidden />
          </label>
        </div>
      </div>

      <div className="dashboard-content">
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

        <div className="usecase-grid">
          {filtered.length === 0 ? (
            <p>No use cases found.</p>
          ) : (
            filtered.map((uc) => (
              <div key={uc.use_case_id} className="usecase-card">
                <div className="card-buttons">
                  <button className="edit-btn" onClick={() => navigate(`/edit/${uc.use_case_id}`)}>
                    <Edit size={14} style={{ marginRight: '4px' }} /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(uc.use_case_id)}>
                    <Trash size={14} style={{ marginRight: '4px' }} /> Delete
                  </button>
                </div>
                <div className="card-content" onClick={() => navigate(`/usecase/${uc.use_case_id}`)}>
                  <div className="card-title">{uc.title}</div>
                  <div className="card-description">
                    {uc.description.includes('.') ? uc.description.slice(0, uc.description.indexOf('.') + 1) : uc.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;