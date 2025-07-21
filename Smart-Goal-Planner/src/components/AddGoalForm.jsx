import React, { useState } from 'react';

function AddGoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.name && newGoal.targetAmount && newGoal.category && newGoal.deadline) {
      onAddGoal({
        ...newGoal,
        targetAmount: parseFloat(newGoal.targetAmount),
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
        id: Date.now().toString(), // Simple unique ID
      });
      setNewGoal({ name: '', targetAmount: '', category: '', deadline: '' });
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3>Add New Goal 🚀</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Name:
          <input type="text" name="name" value={newGoal.name} onChange={handleChange} required />
        </label>
        <label>
          Target Amount:
          <input type="number" name="targetAmount" value={newGoal.targetAmount} onChange={handleChange} required min="0.01" step="0.01" />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={newGoal.category} onChange={handleChange} required />
        </label>
        <label>
          Deadline:
          <input type="date" name="deadline" value={newGoal.deadline} onChange={handleChange} required />
        </label>
        <button type="submit" style={styles.submitButton}>Add Goal</button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '20px auto',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default AddGoalForm;