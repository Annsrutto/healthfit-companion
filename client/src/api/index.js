import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const userRegister = async ( data ) => API.post("/user/register" , data);
export const userLogin = async ( data ) => API.post("/user/login" , data);

export const getDashboardDetails = async ( token ) => 
    API.get("/user/dashboard" , {
        headers: { Authorization: `Bearer ${token}` },
});

export const getExercises = async ( token, date ) => 
    await API.get(`/user/exercises${date}` , {
        headers: { Authorization: `Bearer ${token}` },
});

export const addWorkouts = async ( token, data ) => 
    await API.post(`/user/exercises`, data, {
        headers: { Authorization: `Bearer ${token}` },
});

