import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UseCaseDetails.css';

function UseCaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [useCase, setUseCase] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/usecases/${id}`)
      .then((res) => {
        setUseCase(res.data);
      })
      .catch((error) => {
        console.error("Error fetching use case details:", error);
      });
  }, [id]);

  if (!useCase) {
    return <div className="loading">Loading use case details...</div>;
  }

  return (
    
    <div className="model-card-page-wrapper">
      
      <div className="model-card-header-area">
        <div className="model-card-back-btn">
          <button onClick={() => navigate(-1)}>⬅ Back to Use Cases</button>
        </div>
      </div>

      <div className="model-card-content-area">
        <div className="model-card-container">
          <header className="model-card-section-header">
            <h2>{useCase.title}</h2>
            <p className="model-category">
              AI Model: {useCase.ai_model_name} | Category: {useCase.use_case_category}
            </p>
          </header>

          {/* Key Information */}
          <section className="model-card-section">
            <h3>Key Information</h3>
            <div className="key-info-grid">
              <div className="key-info-card">
                <strong>Business Owner:</strong><br />{useCase.business_owner}
              </div>
              <div className="key-info-card">
                <strong>Business Area:</strong><br />{useCase.business_area}
              </div>
              <div className="key-info-card">
                <strong>Lifecycle Stage:</strong><br />{useCase.lifecycle_stage}
              </div>
              <div className="key-info-card">
                <strong>Risk Category:</strong><br />
                <span className={`risk-badge ${useCase.risk_category?.toLowerCase()}`}>
                  {useCase.risk_category}
                </span>
              </div>
            </div>
          </section>

          {/* Description & Impact */}
          <section className="model-card-section">
            <h3>Description & Intended Impact</h3>
            <p className="description-text"><strong>Description:</strong> {useCase.description}</p>
            <p><strong>Expected Benefits:</strong> {useCase.expected_benefits}</p>
            <p><strong>KPIs Impacted:</strong> {useCase.kpis_impacted}</p>
          </section>

          {/* Additional Model Information */}
          {useCase.model_details && (
            <section className="model-card-section">
              <h3>Additional Model Information</h3>
              <div className="model-details-raw-content" dangerouslySetInnerHTML={{ __html: useCase.model_details }} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default UseCaseDetails;
