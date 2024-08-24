import React from 'react';
import { FitnessCenterRounded, TimelapseRounded } from '@mui/icons-material';
import styled from 'styled-components';

const Card = styled.div`
    flex: 1;
    min-width: 280px;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.text_primary + 20};
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.text_primary + 15};
    @media (max-width: 600px) {
        padding: 16px;
    }
`;

const Category = styled.div`
    width: fit-content;
    font-size: 14px;
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
    background: ${({ theme }) => theme.primary + 20};
    padding: 4px 10px;
    border-radius: 8px;
`;

const Name = styled.div`
    font-size: 20px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 600;
`;
const Sets = styled.div`
    font-size: 15px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    display: flex;
    gap: 6px;
`;

const Flex = styled.div`
    display: flex;
    gap: 16px;
`;

const Details = styled.div`
    font-size: 15px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;  
`;

const ExercisesCard = () => {
  return (
    <Card>
      <Category>Legs</Category>
      <Name>Back Squat</Name>
      <Sets>Count: 5 sets x 10 reps</Sets>
      <Flex>
        <Details>
            <FitnessCenterRounded sx={{ fontSize:"20px" }} />
            30kg
        </Details>
        <Details>
            <TimelapseRounded  sx={{ fontSize:"20px" }} />
            15min
        </Details>
      </Flex>
    </Card>
  )
}

export default ExercisesCard;
