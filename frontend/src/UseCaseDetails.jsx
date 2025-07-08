// UseCaseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UseCaseDetails.css';

function UseCaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [useCase, setUseCase] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/usecases/${id}`).then((res) => {
      setUseCase(res.data);
    });
  }, [id]);

  if (!useCase) return <div>Loading...</div>;

  return (
  <div className="page-container">
    <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>

    <div className="details-container">
      <h2>{useCase.title}</h2>
      <p><strong>Description:</strong> {useCase.description}</p>
      <p><strong>Business Owner:</strong> {useCase.business_owner}</p>
      <p><strong>Model:</strong> {useCase.ai_model_name}</p>
      <p><strong>Category:</strong> {useCase.use_case_category}</p>
      <p><strong>Business Area:</strong> {useCase.business_area}</p>
      <p><strong>Risk:</strong> {useCase.risk_category}</p>
      <p><strong>Lifecycle Stage:</strong> {useCase.lifecycle_stage}</p>
      <p><strong>KPIs Impacted:</strong> {useCase.kpis_impacted}</p>
      <p><strong>Expected Benefits:</strong> {useCase.expected_benefits}</p>
      <p><strong>Model Details:</strong></p>
      <div dangerouslySetInnerHTML={{ __html: useCase.model_details }} />
    </div>
  </div>
  );
  
}

export default UseCaseDetails;