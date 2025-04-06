import { useState } from 'react';
import axios from 'axios';
import { LoginResponse } from '../../api/type';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const params = new URLSearchParams();
    params.append("username", form.username);
    params.append("password", form.password);

    try {
      const response = await axios.post<LoginResponse>(
        'http://127.0.0.1:8000/login/',
        params,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );
      localStorage.setItem("token", response.data.access_token);
      alert("Login successful!");
      navigate('/');
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to F1 Tracker</h2>
        <div className="auth-form">
          <input 
            name="username" 
            onChange={handleChange} 
            placeholder="Username"
            className="auth-input"
          />
          <input 
            name="password" 
            type="password" 
            onChange={handleChange} 
            placeholder="Password"
            className="auth-input"
          />
          <button onClick={handleLogin} className="auth-button">Login</button>
        </div>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 