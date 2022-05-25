import axios from "axios";

const api = axios.create({
  baseURL: "https://hamburgueria-json-server-2.herokuapp.com",
});

export default api;
