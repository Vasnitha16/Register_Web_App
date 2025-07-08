import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AddUseCase.css';

function EditUseCase() {
  const [formData, setFormData] = useState(null);  // Initially null
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/usecases/${id}`)
      .then((res) => {
        if (res.data && res.data.use_case_id) {
          setFormData(res.data);
        } else {
          alert("Use case not found.");
          navigate('/dashboard');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch use case", err);
        alert("Error loading use case.");
        navigate('/dashboard');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValid = formData && Object.values(formData).every(val => val && val.toString().trim() !== '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      await axios.put(`http://localhost:5000/usecases/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to update use case.');
    }
  };

  if (loading || !formData) return <div style={{ textAlign: 'center' }}>Loading use case...</div>;

  return (
    <div className="add-page">
      <div className="add-card">
        <h2>Edit AI Use Case</h2>
        <form className="add-form" onSubmit={handleUpdate}>
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Business Owner</label>
              <input name="business_owner" value={formData.business_owner} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>AI Model Name</label>
              <input name="ai_model_name" value={formData.ai_model_name} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Use Case Category</label>
              <input name="use_case_category" value={formData.use_case_category} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Business Area</label>
              <input name="business_area" value={formData.business_area} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Risk Category</label>
              <select name="risk_category" value={formData.risk_category} onChange={handleChange} required>
                <option value="">Select Risk</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Lifecycle Stage</label>
              <select name="lifecycle_stage" value={formData.lifecycle_stage} onChange={handleChange} required>
                <option value="">Select Stage</option>
                <option>Idea</option>
                <option>Development</option>
                <option>Testing</option>
                <option>Production</option>
                <option>Retired</option>
              </select>
            </div>
            <div className="form-group">
              <label>KPIs Impacted</label>
              <textarea name="kpis_impacted" rows="2" value={formData.kpis_impacted} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Expected Benefits</label>
              <textarea name="expected_benefits" rows="2" value={formData.expected_benefits} onChange={handleChange} required />
            </div>
          </div>

          {/* Final Row */}
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Model Details</label>
              <textarea name="model_details" rows="2" value={formData.model_details} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <label>Description</label>
              <textarea name="description" rows="2" value={formData.description} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" disabled={!isValid}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditUseCase;
