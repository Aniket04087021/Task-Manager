import React, { useEffect, useState } from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

function Home({ logout }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Task Manager</h1>
        <button onClick={logout} style={styles.logoutButton}>Logout</button>
      </header>
      <main style={styles.main}>
        <AddTask onAdd={fetchTasks} />
        <TaskList tasks={tasks} onUpdate={fetchTasks} />
      </main>
      <footer style={styles.footer}>
        <p style={styles.footerText}>Developed by Aniket</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      padding: '1rem',
      flexDirection: 'column',
      gap: '1rem',
      textAlign: 'center',
    },
  },
  title: {
    color: '#333',
    margin: 0,
    fontSize: '1.5rem',
    '@media (max-width: 480px)': {
      fontSize: '1.25rem',
    },
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#cc0000',
    },
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
  main: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 1rem',
    flex: 1,
    width: '100%',
    '@media (max-width: 480px)': {
      margin: '1rem auto',
      padding: '0 0.5rem',
    },
  },
  footer: {
    backgroundColor: 'white',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: 'auto',
  },
  footerText: {
    color: '#666',
    margin: 0,
    fontSize: '0.9rem',
  },
};

export default Home;
