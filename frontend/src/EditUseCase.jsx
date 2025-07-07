// EditUseCases.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // reuse styling

function EditUseCase({ userId }) {
  const [useCases, setUseCases] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/usecases?user_id=${userId}`)
      .then((res) => {
        setUseCases(res.data);
      });
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h2>Edit Your Use Cases</h2>
      <div className="usecase-grid">
        {useCases.map((uc) => (
          <div key={uc.use_case_id} className="usecase-card">
            <div className="card-title">{uc.title}</div>
            <div className="card-description">{uc.description}</div>
            <button onClick={() => console.log('Edit logic here')}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditUseCase;
