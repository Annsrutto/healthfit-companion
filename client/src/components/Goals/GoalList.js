import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalForm from './GoalForm';

const GoalList = () => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/goals', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setGoals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div>
      <h3>Goals</h3>
      <GoalForm onGoalAdded={fetchGoals} />
      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>{goal.goal}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
