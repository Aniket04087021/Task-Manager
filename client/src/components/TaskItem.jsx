import React from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';

function TaskItem({ task, onUpdate }) {
  const completeTask = async () => {
    await fetch(`https://task-manager-1-m5a0.onrender.com/api/tasks/${task.id}`, { method: 'PUT' });
    onUpdate();
  };

  const deleteTask = async () => {
    await fetch(`https://task-manager-1-m5a0.onrender.com/api/tasks/${task.id}`, { method: 'DELETE' });
    onUpdate();
  };

  return (
    <div style={styles.container}>
      <span style={{
        ...styles.text,
        textDecoration: task.completed ? 'line-through' : 'none',
        color: task.completed ? '#666' : '#333',
      }}>
        {task.text}
      </span>
      <div style={styles.actions}>
        {!task.completed && (
          <button onClick={completeTask} style={styles.completeButton}>
            <FaCheck style={styles.icon} />
            Complete
          </button>
        )}
        <button onClick={deleteTask} style={styles.deleteButton}>
          <FaTrash style={styles.icon} />
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Poppins, sans-serif',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'flex-start',
    },
  },
  text: {
    fontSize: '1rem',
    flex: 1,
    wordBreak: 'break-word',
    paddingRight: '1rem',
    fontFamily: 'Poppins, sans-serif',
    '@media (max-width: 480px)': {
      paddingRight: 0,
      width: '100%',
    },
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    '@media (max-width: 480px)': {
      width: '100%',
      justifyContent: 'flex-end',
    },
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    ':hover': {
      backgroundColor: '#45a049',
    },
    '@media (max-width: 480px)': {
      flex: 1,
      justifyContent: 'center',
    },
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    ':hover': {
      backgroundColor: '#d32f2f',
    },
    '@media (max-width: 480px)': {
      flex: 1,
      justifyContent: 'center',
    },
  },
  icon: {
    fontSize: '1rem',
  },
};

export default TaskItem;
