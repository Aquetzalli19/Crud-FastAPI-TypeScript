import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import { Task } from "../types/tasks"; // Importamos la interfaz desde types.ts

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await axios.get("http://localhost:8000/api/tasks");
      console.log(res);
      setTasks(res.data);
    }
    fetchTasks();
  }, []);

  return <TaskList tasks={tasks} />;
}

export default Home;
