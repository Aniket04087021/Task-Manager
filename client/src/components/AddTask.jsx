import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function AddTask({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    setText('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input 
        style={styles.input}
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Add a new task..." 
      />
      <button type="submit" style={styles.button}>
        <FaPlus style={styles.icon} />
        Add Task
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    fontFamily: 'Poppins, sans-serif',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  input: {
    flex: 1,
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
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    ':hover': {
      backgroundColor: '#535bf2',
    },
    '@media (max-width: 480px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  icon: {
    fontSize: '1rem',
  },
};

export default AddTask;