import React, { useState } from 'react';
import axios from 'axios';

const ExerciseForm = () => {
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/exercises',
        { exercise, duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Exercise logged!');
    } catch (error) {
      console.error('Error logging exercise', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <button type="submit">Log Exercise</button>
    </form>
  );
};

export default ExerciseForm;
