import React, { useState } from 'react';
import styled from 'styled-components';
import { counts } from '../assets/Data';
import CountsCard from '../components/cards/CountsCard';
import WeeklyStatCard from '../components/cards/WeeklyStatCard';
import ChartStatCard from '../components/cards/ChartStatCard';
import AddExercise from '../components/AddExercise';
import ExercisesCard from '../components/cards/ExercisesCard';

const Container = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 22px 0px;
    overflow-y: scroll;
`;

const Wrapper = styled.div`
    flex: 1;
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;

const Title = styled.div`
    font-size: 22px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    padding: 0px 16px;
`;

const FlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 22px;
    padding: 0px 16px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 16px;
    gap: 22px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 100px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;

const Dashboard = () => {
    const [workout, setWorkout] = useState();
    const data = {
        totalCaloriesBurned: 7500,
        totalWorkouts: 5,
        avgCaloriesBurnedPerWorkout: 1500,
        totalWeeksCaloriesBurned: {
            weeks: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"],
            caloriesBurned: [1500, 0, 2500, 0, 2500, 0, 7500]
        },
        pieChartData: [
            {
                id: 1,
                value: 1500,
                label: "Legs",
            },
            {
                id: 2,
                value: 3750,
                label: "Shoulders & Back",
            },
            {
                id: 3,
                value: 2250,
                label: "Abs",
            },
            {
                id: 4,
                value: 1750,
                label: "Glutes",
            }
        ]
    }
  return (
    <Container>
        <Wrapper>
            <Title>Dashboard</Title>
            <FlexWrap>
                {counts.map((item) => (
                    <CountsCard item={ item } data={data}/>
                ))}
            </FlexWrap>
            <FlexWrap>
                <WeeklyStatCard data={data} />
                <ChartStatCard data={data} />
                <AddExercise workout={workout} setWorkout={setWorkout} />
            </FlexWrap>
            <Section>
                <Title>Today's Workouts</Title>
                <CardWrapper>
                    <ExercisesCard />
                    <ExercisesCard />
                    <ExercisesCard />
                    <ExercisesCard />
                </CardWrapper>
            </Section>
        </Wrapper>
    </Container>
  )
}

export default Dashboard;
