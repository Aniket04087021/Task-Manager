import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

function Signup({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'https://task-manager-1-m5a0.onrender.com'}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (data.success && data.token) {
        login(data.token);
        navigate('/');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input 
              style={styles.input}
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Username" 
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <input 
              style={styles.input}
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password" 
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            <FaUserPlus style={styles.icon} />
            Sign Up
          </button>
          <p style={styles.linkText}>
            Already have an account? <Link to="/login" style={styles.link}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Add this to your existing styles
const styles = {
  // ... your existing styles ...
  error: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: '1rem',
    padding: '0.5rem',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    fontSize: '0.9rem'
  }
};

export default Signup;