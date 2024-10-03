import { FormEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TaskForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!params.id) {
        const res = await axios.post("http://localhost:8000/api/tasks", {
          title,
          description,
        });

        console.log(res);
        console.log("Task created");
      } else {
        const res = await axios.put(
          `http://localhost:8000/api/tasks/${params.id}`,
          {
            title,
            description,
          }
        );

        console.log(res);
      }

      (e.target as HTMLFormElement).reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchTask();
    }

    async function fetchTask() {
      const res = await axios.get(
        `http://localhost:8000/api/tasks/${params.id}`
      );
      console.log(res);
      setTitle(res.data.title);
      setDescription(res.data.description);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh - 10rem)]">
      <div>
        <h1 className="text-3xl font-bold my-4">
          {params.id ? "Update Task" : "Create Task"}
        </h1>
        <form className=" bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            className="block py-2 px-3 mb-4 w-full text-black "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
          />
          <textarea
            placeholder="description"
            rows={3}
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 w-full rounded">
            {params.id ? "Update Taks" : "Create Task"}
          </button>
        </form>

        {params.id && (
          <button
          className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 w-full rounded mt-5"
          onClick={async () => {
            try {
              const res = axios.delete(
                `http://localhost:8000/api/tasks/${params.id}`
              );
              console.log(res);
              navigate("/");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Delete
        </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;
