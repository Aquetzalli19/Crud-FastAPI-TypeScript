import axios from "axios";

const API_URL = "http://localhost:8000";
const endpoint = `${API_URL}/api/tasks`;

export const fetchTasks = async (id : string) => await axios.get(`/${endpoint}/${id}`)

