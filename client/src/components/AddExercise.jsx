import React from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';

const Card = styled.div`
    flex: 1;
    min-width: 280px;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.text_primary + 20};
    border-radius: 14px;
    display: flex;
    gap: 6px;
    box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.text_primary + 15};
    @media (max-width: 600px) {
        padding: 16px;
    }
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

const AddExercise = ({ workout, setWorkout}) => {
  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows={10}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
        placeholder={`Enter in this format:
#Category
- Workout
- Sets
- Reps
- Weight
- Duration
            `}
      />
      <Button text='Add Workout' small/>
    </Card>
  )
}

export default AddExercise;
