import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (

<Routes>
      <Route path="/" element={token ? <Home logout={logout} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage login={login} />} />
      <Route path="/signup" element={<SignupPage login={login} />} />
    </Routes>
    
  );
}

export default App;