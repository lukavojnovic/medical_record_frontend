import axios from "axios";

// const user = localStorage.getItem("user");

// const parsedUser = user ? JSON.parse(user) : null;

const instance = axios.create({
    baseURL: "http://localhost:4321/",
    headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",

        // Authorization: parsedUser?.token ? `Bearer ${parsedUser.token}` : ""
    },
});

export default instance;
