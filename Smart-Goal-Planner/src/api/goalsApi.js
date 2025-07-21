const API_URL = 'http://localhost:3000/goals';

export const fetchGoals = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch goals');
  }
  return response.json();
};

export const addGoal = async (newGoal) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGoal),
  });
  if (!response.ok) {
    throw new Error('Failed to add goal');
  }
  return response.json();
};

export const updateGoal = async (id, updatedFields) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH', // Using PATCH for partial updates
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) {
    throw new Error('Failed to update goal');
  }
  return response.json();
};

export const deleteGoal = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete goal');
  }
  return response.json();
};