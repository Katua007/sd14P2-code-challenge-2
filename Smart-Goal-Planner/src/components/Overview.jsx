import React from 'react';
import { differenceInDays } from 'date-fns';

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalMoneySaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const goalsCompleted = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  return (
    <div style={styles.overviewContainer}>
      <h2>Savings Overview 📈</h2>
      <p>Total Goals: <strong>{totalGoals}</strong></p>
      <p>Total Money Saved Across All Goals: <strong>${totalMoneySaved.toLocaleString()}</strong></p>
      <p>Goals Completed: <strong>{goalsCompleted}</strong></p>

      <h3>Goal Deadlines:</h3>
      <ul style={styles.deadlineList}>
        {goals.map(goal => {
          const daysLeft = differenceInDays(new Date(goal.deadline), new Date());
          const isCompleted = goal.savedAmount >= goal.targetAmount;
          let statusText = '';
          let statusColor = 'inherit';

          if (isCompleted) {
            statusText = '(Completed 🎉)';
            statusColor = 'green';
          } else if (daysLeft <= 0) {
            statusText = '(Overdue 🔴)';
            statusColor = 'red';
          } else if (daysLeft <= 30) {
            statusText = `(${daysLeft} days left ⚠️)`;
            statusColor = 'orange';
          } else {
            statusText = `(${daysLeft} days left)`;
          }

          return (
            <li key={goal.id}>
              {goal.name}: <span style={{ color: statusColor }}>{statusText}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const styles = {
  overviewContainer: {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '20px auto',
    borderRadius: '8px',
    backgroundColor: '#eaf4fd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '800px',
  },
  deadlineList: {
    listStyleType: 'none',
    padding: 0,
  },
  statusText: {
    fontWeight: 'bold',
  },
};

export default Overview;