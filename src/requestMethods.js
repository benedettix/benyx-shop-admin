import axios from "axios";

const BASE_URL = "https://6374c8ab48dfab73a4e8be95.mockapi.io/onlineshop/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
