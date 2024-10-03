import { Task } from '../types/tasks';
import TaskCard from './TaskCard'; // Importamos el componente TaskCard

interface TaskListProps {
  tasks: Task[]; // Define la prop que recibe TaskList
}

function TaskList({ tasks }: TaskListProps) {

  console.log(tasks);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {tasks.map((task) => (
        <TaskCard task={task} /> // Pasa task como prop a TaskCard
      ))}
    </div>
  );
}

export default TaskList;