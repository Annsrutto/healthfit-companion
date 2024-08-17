import React from 'react';
import ExerciseList from '../Exercises/ExerciseList';
import GoalList from '../Goals/GoalList';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <ExerciseList />
      <GoalList />
    </div>
  );
};

export default Dashboard;
