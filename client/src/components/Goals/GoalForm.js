import React, { useState } from 'react';
import axios from 'axios';

const GoalForm = () => {
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/goals',
        { goal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Goal set!');
    } catch (error) {
      console.error('Error setting goal', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />
      <button type="submit">Set Goal</button>
    </form>
  );
};

export default GoalForm;
