import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './UseCaseDetails.css';

function UseCaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [useCase, setUseCase] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/usecases/${id}`)
      .then((res) => setUseCase(res.data))
      .catch((error) => console.error("Error fetching use case details:", error));
  }, [id]);

  const fetchAccuracyData = () => {
    axios.get(`http://localhost:5000/model-accuracy/${id}`)
      .then((res) => {
        setChartData(res.data);
        setShowGraph(true);
      })
      .catch((err) => console.error("Error fetching accuracy graph:", err));
  };

  if (!useCase) return <div className="loading">Loading use case details...</div>;

  return (
    <div className="model-card-page-wrapper">
      <div className="model-card-header-area">
        <button onClick={() => navigate(-1)}>⬅ Back to Use Cases</button>
      </div>

      <div className="model-card-content-area">
        <div className="model-card-container">
          <header className="model-card-section-header">
            <h2>{useCase.title}</h2>
            <p className="model-category">
              AI Model: {useCase.ai_model_name} | Category: {useCase.use_case_category}
            </p>
          </header>

          <section className="model-card-section">
            <h3>Key Information</h3>
            <div className="key-info-grid">
              <div><strong>Business Owner:</strong><br />{useCase.business_owner}</div>
              <div><strong>Business Area:</strong><br />{useCase.business_area}</div>
              <div><strong>Lifecycle Stage:</strong><br />{useCase.lifecycle_stage}</div>
              <div><strong>Risk Category:</strong><br />
                <span className={`risk-badge ${useCase.risk_category?.toLowerCase()}`}>
                  {useCase.risk_category}
                </span>
              </div>
            </div>
          </section>

          <section className="model-card-section">
            <h3>Description & Intended Impact</h3>
            <p><strong>Description:</strong> {useCase.description}</p>
            <p><strong>Expected Benefits:</strong> {useCase.expected_benefits}</p>
            <p><strong>KPIs Impacted:</strong> {useCase.kpis_impacted}</p>
          </section>

          {useCase.model_details && (
            <section className="model-card-section">
              <h3>Additional Model Information</h3>
              <div dangerouslySetInnerHTML={{ __html: useCase.model_details }} />
            </section>
          )}

          {/* Button to show accuracy chart */}
          <section className="model-card-section">
            <button onClick={fetchAccuracyData} className="accuracy-button">
              Show Accuracy Graph (Last 3 Months)
            </button>

            {showGraph && chartData.length > 0 && (
              <div className="chart-container">
                <h3>Model Accuracy Over Last 3 Months</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="accuracy" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {showGraph && chartData.length === 0 && (
              <p>No accuracy data available for the last 3 months.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default UseCaseDetails;
