import { useDriverData } from '../api/endpoint';
import '../styles/DriversDisplay.css';

const DriversDisplay = () => {
  const { drivers, isLoading, isError } = useDriverData();

  if (isError) return <div className="error-message">Failed to load</div>;
  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="drivers-container">
      <h1 className="title">F1 Championship Standings</h1>
      <div className="drivers-grid">
        {drivers.map((driver) => (
          <div key={driver.driver_name} className="driver-card">
            <div className="position">
              {driver.position !== null ? `#${driver.position}` : 'N/A'}
            </div>
            <div className="driver-info">
              <h2 className="driver-name">{driver.driver_name}</h2>
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