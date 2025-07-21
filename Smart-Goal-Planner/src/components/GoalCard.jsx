import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';

function GoalCard({ goal, onUpdate, onDelete, onDeposit }) {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  const progress = (savedAmount / targetAmount) * 100;
  const remainingAmount = targetAmount - savedAmount;
  const isCompleted = savedAmount >= targetAmount;

  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });
  const [depositAmount, setDepositAmount] = useState('');

  const daysLeft = differenceInDays(new Date(deadline), new Date());
  const isApproachingDeadline = daysLeft <= 30 && daysLeft > 0 && !isCompleted;
  const isOverdue = daysLeft <= 0 && !isCompleted;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    onUpdate(id, editedGoal);
    setIsEditing(false);
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositAmount > 0) {
      onDeposit(id, parseFloat(depositAmount));
      setDepositAmount('');
    }
  };

  return (
    <div style={styles.goalCard}>
      {isEditing ? (
        <div>
          <label>Name: <input type="text" name="name" value={editedGoal.name} onChange={handleEditChange} /></label><br />
          <label>Target: <input type="number" name="targetAmount" value={editedGoal.targetAmount} onChange={handleEditChange} /></label><br />
          <label>Category: <input type="text" name="category" value={editedGoal.category} onChange={handleEditChange} /></label><br />
          <label>Deadline: <input type="date" name="deadline" value={editedGoal.deadline} onChange={handleEditChange} /></label><br />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{name}</h3>
          <p>Category: {category}</p>
          <p>Target: ${targetAmount.toLocaleString()}</p>
          <p>Saved: ${savedAmount.toLocaleString()}</p>
          <p>Remaining: ${remainingAmount.toLocaleString()}</p>
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: isCompleted ? 'green' : '#4CAF50',
              }}
            ></div>
          </div>
          <p style={{ fontSize: '0.9em', color: '#555' }}>
            Progress: {progress.toFixed(2)}% {isCompleted && '🎉 Completed!'}
          </p>
          <p>Deadline: {format(new Date(deadline), 'MMM dd, yyyy')}</p>
          {isApproachingDeadline && (
            <p style={styles.warningText}>⚠️ Deadline approaching! ({daysLeft} days left)</p>
          )}
          {isOverdue && (
            <p style={styles.overdueText}>🔴 Overdue!</p>
          )}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id)} style={styles.deleteButton}>Delete</button>

          <form onSubmit={handleDepositSubmit} style={styles.depositForm}>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Deposit amount"
              min="0.01"
              step="0.01"
              required
            />
            <button type="submit">Deposit</button>
          </form>
        </>
      )}
    </div>
  );
}

const styles = {
  goalCard: {
    border: '1px solid #ddd',
    padding: '15px',
    margin: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '300px',
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    height: '10px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '5px',
    transition: 'width 0.5s ease-in-out',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  depositForm: {
    marginTop: '15px',
    display: 'flex',
    gap: '5px',
  },
  warningText: {
    color: 'orange',
    fontWeight: 'bold',
  },
  overdueText: {
    color: 'red',
    fontWeight: 'bold',
  }
};

export default GoalCard;