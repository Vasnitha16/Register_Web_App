import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddUseCase.css';

function AddUseCase() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    business_owner: '',
    ai_model_name: '',
    use_case_category: '',
    business_area: '',
    risk_category: '',
    lifecycle_stage: '',
    kpis_impacted: '',
    expected_benefits: '',
    model_details: ''
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const isValid = Object.values(formData).every((val) => val.trim() !== '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      await axios.post('http://localhost:5000/usecases', {
        ...formData,
        user_id: userId
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to add use case.');
    }
  };

  return (
    <div className="add-page">
      <div className="add-card">
        <h2>Add AI Use Case</h2>
        <form className="add-form" onSubmit={handleSubmit}>

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
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Lifecycle Stage</label>
              <select name="lifecycle_stage" value={formData.lifecycle_stage} onChange={handleChange} required>
                <option value="">Select Stage</option>
                <option value="Idea">Idea</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Production">Production</option>
                <option value="Retired">Retired</option>
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

          <button type="submit" disabled={!isValid}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddUseCase;
