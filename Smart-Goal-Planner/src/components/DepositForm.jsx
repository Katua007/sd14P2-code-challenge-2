import React, { useState } from 'react';

function DepositForm({ goals, onDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGoalId && depositAmount > 0) {
      onDeposit(selectedGoalId, parseFloat(depositAmount));
      setSelectedGoalId('');
      setDepositAmount('');
    } else {
      alert('Please select a goal and enter a valid deposit amount.');
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3>Make a General Deposit 💰</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Select Goal:
          <select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} required>
            <option value="">-- Select a Goal --</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Deposit amount"
            min="0.01"
            step="0.01"
            required
          />
        </label>
        <button type="submit" style={styles.submitButton}>Deposit to Selected Goal</button>
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
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default DepositForm;