import React from 'react';
import styled from 'styled-components';
import { PieChart } from '@mui/x-charts/PieChart';

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

const ChartStatCard = ({data}) => {
  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      {data?.pieChartData && (
        <PieChart 
        series={[{
            data: data?.pieChartData,
            innerRadius: 30,
            paddingAngle: 2,
            cornerRadius: 4,
            outerRadius: 100,
            cx: 132
        }]}
        height={300}
        width={500}
      />)}
    </Card>
  )
}

export default ChartStatCard;
