import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate }) {
  return (
    <div style={styles.container}>
      {tasks.length === 0 ? (
        <p style={styles.emptyMessage}>No tasks yet. Add your first task!</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onUpdate={onUpdate} />
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default TaskList;