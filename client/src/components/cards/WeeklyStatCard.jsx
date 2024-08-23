import React from 'react';
import styled from 'styled-components';
import { BarChart } from '@mui/x-charts/BarChart';

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

const WeeklyStatCard = ({data}) => {
  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      {data?.totalWeeksCaloriesBurned && (
        <BarChart 
         xAxis={[{scaleType: "band", data: data?.totalWeeksCaloriesBurned?.weeks}]}
         series={[{data: data?.totalWeeksCaloriesBurned?.caloriesBurned}]}
         height={300}
         width={500}
      />)}
    </Card>
  )
}

export default WeeklyStatCard;
