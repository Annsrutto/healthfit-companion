import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/exercises', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises', error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div>
      <h3>Your Exercises</h3>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            {exercise.exercise} - {exercise.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
