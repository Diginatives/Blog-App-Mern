import axios from "axios";

const BASE_URL = "https://blog-api-11.herokuapp.com/api/";
const TOKEN = JSON.parse(localStorage.getItem("user"))?.accessToken;

//Requests for public users without token
export const axiosPublic = axios.create({
    baseURL: BASE_URL,
})


export const axiosUser = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})