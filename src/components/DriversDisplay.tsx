import React, { useState } from 'react';
import { useDriverData } from '../api/endpoint';
import '../styles/DriversDisplay.css';

const DriversDisplay = () => {

  const [inputForm, setInputForm] = useState({ year: '2025', gp: '2' });
  const [appliedForm, setAppliedForm] = useState({ year: '2025', gp: '2' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = () => {
    console.log('Updated form:', inputForm);
    setAppliedForm({ ...inputForm });
  };

  const { drivers, isLoading, isError } = useDriverData(
    appliedForm.year,
    appliedForm.gp
  );

  return (
    <div className="drivers-container">
      <h1 className="title">F1 Championship Standings</h1>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          name="year"
          type="text"
          value={inputForm.year}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="gp">GP:</label>
        <input
          name="gp"
          type="text"
          value={inputForm.gp}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Update</button>
      <div className="drivers-grid">
      {!isLoading && !isError && drivers.map((driver) => (
          <div key={driver.driver_name} className="driver-card">
            <div className="position">
              {driver.position !== null ? `#${driver.position}` : 'N/A'}
            </div>
            <div className="driver-info">
              <h2 className="driver-name">{[driver.driver_name, driver.gp_name]}</h2>
              <div className="stats">
                <span className="points">{driver.current_points} Points</span>
                <span className="max-points">Max: {driver.theoretical_max_points}</span>
              </div>
              <div className={`championship-status ${driver.can_win === 'Yes' ? 'can-win' : 'cannot-win'}`}>
                {driver.can_win === 'Yes' ? 'Championship Possible' : 'Out of Championship'}
              </div>
            </div>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default DriversDisplay;