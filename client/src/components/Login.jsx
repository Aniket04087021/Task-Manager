import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        login(data.token);
        navigate('/');
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input 
              style={styles.input}
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Username" 
            />
          </div>
          <div style={styles.inputGroup}>
            <input 
              style={styles.input}
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password" 
            />
          </div>
          <button type="submit" style={styles.button}>
            <FaSignInAlt style={styles.icon} />
            Login
          </button>
          <p style={styles.linkText}>
            Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    '@media (max-width: 480px)': {
      padding: '1.5rem',
    },
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
    fontSize: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
    '@media (max-width: 480px)': {
      fontSize: '1.25rem',
      marginBottom: '1.5rem',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif',
    ':focus': {
      borderColor: '#646cff',
    },
  },
  button: {
    backgroundColor: '#646cff',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    ':hover': {
      backgroundColor: '#535bf2',
    },
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
  linkText: {
    textAlign: 'center',
    color: '#666',
    marginTop: '1rem',
    fontSize: '0.9rem',
    fontFamily: 'Poppins, sans-serif',
  },
  link: {
    color: '#646cff',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    fontSize: '1rem',
  },
};

export default Login;
