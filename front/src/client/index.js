import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:3000/api/v1";
const client = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default client;
