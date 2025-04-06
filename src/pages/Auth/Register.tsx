import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Auth.css'

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const data = {
      username: form.username,
      email: form.email,
      password: form.password
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/registration/',
        data, 
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log('Sent data:', data);
      console.log('Response:', response.data);
      
      if (response.data.msg === "User registered successfully") {
        alert("Registration successful!");
        navigate('/login');
      }
    } catch (err: any) {
      console.error('Full error:', err);
      console.error('Error data:', err.response?.data);
      if (err.response?.data?.detail) {
        console.error('Error details:', err.response.data.detail);
      }
      if (err.response?.status === 409) {
        alert("Email already registered");
      } else {
        alert(err.response?.data?.detail || "Registration failed");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            name="username" 
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            placeholder="Username"
            className="auth-input"
            required
          />
          <input 
            name="email"
            type="email" 
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="auth-input"
            required
          />
          <input 
            name="password" 
            type="password" 
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;