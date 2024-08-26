import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { counts } from '../assets/Data';
import CountsCard from '../components/cards/CountsCard';
import WeeklyStatCard from '../components/cards/WeeklyStatCard';
import ChartStatCard from '../components/cards/ChartStatCard';
import AddExercise from '../components/AddExercise';
import ExercisesCard from '../components/cards/ExercisesCard';
import { getDashboardDetails, getExercises, addWorkouts } from '../api';

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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [todaysWorkouts, setTodaysWorkouts] = useState([]);
    const [workout, setWorkout] = useState(`#Legs
        - Sumo Squats
        - 5 sets x 15 reps
        - 30kg
        - 10 min     
        `);

const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("afyaFit-app-token");
    await getDashboardDetails(token).then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
    });
};

const getTodaysExercises = async () => {
    setLoading(true);
    const token = localStorage.getItem("afyaFit-app-token");
    await getExercises(token, "").then((res) => {
        setTodaysWorkouts(res?.data?.todaysWorkouts);
        console.log(res.data);
        setLoading(false);
    });
};

const addNewExercise = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("afyaFit-app-token");
    await addWorkouts(token, { workoutString: workout }).then((res) => {
        dashboardData();
        getTodaysExercises();
        setButtonLoading(false);
    })
    .catch((err) => {
        alert(err);
    });
};

useEffect(() => {
    dashboardData();
    getTodaysExercises();
}, []);

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
                <AddExercise
                 workout={workout} 
                 setWorkout={setWorkout} 
                 addNewExercise={addNewExercise}
                 buttonLoading={buttonLoading}
                />
            </FlexWrap>
            <Section>
                <Title>Today's Workouts</Title>
                <CardWrapper>
                    {todaysWorkouts.map((workout) => (
                        <ExercisesCard workout={workout} />
                    ))}
                </CardWrapper>
            </Section>
        </Wrapper>
    </Container>
  )
}

export default Dashboard;
