import axios from 'axios';

const API = axios.create({
    baseURL: "https://afyafit.onrender.com/api",
});

export const userRegister = async ( data ) => API.post("/auth/register" , data);
export const userLogin = async ( data ) => API.post("/auth/login" , data);

export const getDashboardDetails = async ( token ) => 
    API.get("/dashboard" , {
        headers: { Authorization: `Bearer ${token}` },
});

export const getExercises = async ( token, date ) => 
    await API.get(`/exercises${date}` , {
        headers: { Authorization: `Bearer ${token}` },
});

export const addWorkouts = async ( token, data ) => 
    await API.post(`/exercises`, data, {
        headers: { Authorization: `Bearer ${token}` },
});

