import React from 'react';
import './App.css';
import DriversDisplay from './components/DriversDisplay';
import AppHeader from './components/AppHeader';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';
import { SWRConfig } from 'swr';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <SWRConfig 
        value={{
          fetcher: (url: string) => fetch(url).then(res => res.json())
        }}
      >
        <Router>
          <AppHeader />
          <div className="App">
            <main>
              <Routes>s
                <Route 
                  path="/" 
                  element={
                      <DriversDisplay />
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SWRConfig>
    </AuthProvider>
  );
}

export default App;
