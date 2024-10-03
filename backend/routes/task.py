from fastapi import APIRouter, HTTPException
from database import get_all_tasks, create_task, get_one_task, update_task, delete_task, get_one_task_title
from models import Task, UpdateTask
#manejador de errores de formato de ID
from bson.errors import InvalidId

task = APIRouter()

@task.get("/api/tasks")
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks

@task.post("/api/tasks", response_model=Task)
async def save_tasks(task : Task):
    taskFound = await get_one_task_title(task.title)
    if taskFound:
        raise HTTPException(409, "Task with this title already exists")
    response = await create_task(task.dict(exclude_unset=True))
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@task.get('/api/tasks/{id}', response_model=Task)
async def get_task(id : str):
    try:
        # Intentar convertir el ID a ObjectId
        task = await get_one_task(id)
        if task:
            # Si se encuentra la tarea, devolverla
            return task
        # Si no se encuentra la tarea, lanzar 404
        raise HTTPException(status_code=404, detail=f"Task with id {id} not found")
    except InvalidId:
        # Si el ObjectId no es válido, lanzar 404 o 400 según el caso que prefieras
        raise HTTPException(status_code=404, detail=f"Invalid Task ID format: {id}")

@task.put('/api/tasks/{id}', response_model=Task)
async def put_tasks(id : str, task : UpdateTask):
    response = await update_task(id, task)
    if response:
        return response
    return HTTPException(404, "Task not found")

@task.delete('/api/tasks/{id}')
async def remove_tasks(id : str):
    response = await delete_task(id)
    if response: 
        return "Successfully deleted task"
    raise HTTPException(404, "Task not found")