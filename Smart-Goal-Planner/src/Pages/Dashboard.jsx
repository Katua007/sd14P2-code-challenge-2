import React, { useState, useEffect, useCallback } from 'react';
import GoalCard from '../components/GoalCard';
import AddGoalForm from '../components/AddGoalForm';
import DepositForm from '../components/DepositForm';
import Overview from '../components/Overview';
import { fetchGoals, addGoal, updateGoal, deleteGoal } from '../api/goalsApi';

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGoals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError('Failed to load goals. Please ensure json-server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  const handleAddGoal = async (newGoal) => {
    try {
      const addedGoal = await addGoal(newGoal);
      setGoals((prevGoals) => [...prevGoals, addedGoal]);
    } catch (err) {
      setError('Failed to add goal.');
      console.error(err);
    }
  };

  const handleUpdateGoal = async (id, updatedFields) => {
    try {
      const updatedGoal = await updateGoal(id, updatedFields);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.id === id ? { ...goal, ...updatedGoal } : goal))
      );
    } catch (err) {
      setError('Failed to update goal.');
      console.error(err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    } catch (err) {
      setError('Failed to delete goal.');
      console.error(err);
    }
  };

  const handleDeposit = async (goalId, amount) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    if (!goalToUpdate) return;

    const newSavedAmount = goalToUpdate.savedAmount + amount;
    try {
      const updatedGoal = await updateGoal(goalId, { savedAmount: newSavedAmount });
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.id === goalId ? { ...goal, savedAmount: newSavedAmount } : goal))
      );
    } catch (err) {
      setError('Failed to make deposit.');
      console.error(err);
    }
  };

  if (loading) return <div style={styles.loading}>Loading goals...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.dashboardContainer}>
      <h1>Smart Goal Planner Dashboard 🎯</h1>

      <Overview goals={goals} />
      <hr style={styles.hr} />

      <AddGoalForm onAddGoal={handleAddGoal} />
      <hr style={styles.hr} />

      <DepositForm goals={goals} onDeposit={handleDeposit} />
      <hr style={styles.hr} />

      <h2>Your Financial Goals</h2>
      <div style={styles.goalsGrid}>
        {goals.length === 0 ? (
          <p>No goals yet. Add one to get started!</p>
        ) : (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={handleUpdateGoal}
              onDelete={handleDeleteGoal}
              onDeposit={handleDeposit}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5em',
    marginTop: '50px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: 'red',
    marginTop: '50px',
  },
  goalsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  hr: {
    border: '0',
    height: '1px',
    background: '#ccc',
    margin: '40px 0',
  },
};

export default Dashboard;