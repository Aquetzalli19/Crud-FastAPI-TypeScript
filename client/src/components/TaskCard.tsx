import { Task } from '../types/tasks';
import { useNavigate, useParams } from 'react-router-dom';


interface TaskCardProps {
  task: Task; // Define la interfaz para las props que recibe TaskCard
}

function TaskCard({ task }: TaskCardProps) { // Recibe task como prop

    const navigate = useNavigate();
    
  return (
    <div key={task._id} className='bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950'
        onClick={ () => {
            navigate(`/task/${task._id}`);
        }}> 
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskCard;
