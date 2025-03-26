import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5172",
});

export default api