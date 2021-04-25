import axios from "axios";

const token = localStorage.getItem("token");

const parsedToken = token ? JSON.parse(token).token : null;

const instance = axios.create({
    baseURL: "http://localhost:4321/",
    headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: parsedToken ? `Bearer ${parsedToken}` : ""
    },
});

export default instance;
