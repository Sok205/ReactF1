import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AppHeader.css';
import { idText } from 'typescript';

const AppHeader = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the username from localStorage on component mount
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="f1-logo" onClick={() => navigate('/')}>F1</div>
        <h1>Championship Tracker</h1>
        <p>2022 Season Standings & Championship Possibilities</p>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
              <button className="auth-button" onClick={() => navigate('/profile')}>
                {username}
              </button>
            </div>
          ) : (
            <div>
              <button className="auth-button" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="auth-button" onClick={() => navigate('/register')}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


export default AppHeader;