from motor.motor_asyncio import AsyncIOMotorClient
from models import Task
from bson import ObjectId

client = AsyncIOMotorClient('mongodb+srv://fastAPI:KasPkHUsPNkmb8Ef@firstcluster.ujtdctd.mongodb.net')
database = client.taskDatabse
collection = database.task


async def get_one_task(id):
    task = await collection.find_one({'_id': ObjectId(id)})
    if task:
        task['_id'] = str(task['_id'])  # Convertir ObjectId a string
    return task


async def get_one_task_title(title):
    task = await collection.find_one({'title': title})
    return task

async def get_all_tasks():
    tasks = []
    cursor = collection.find({})
    async for document in cursor:
        # Convertimos el ObjectId a string antes de pasar el documento al modelo
        document['_id'] = str(document['_id'])  # Convierte el ObjectId a string
        tasks.append(Task(**document))  # Crea la instancia de Task
    return tasks
async def create_task(task):
    # Inserta la tarea en la colección MongoDB
    new_task = await collection.insert_one(task)
    
    # Recupera la tarea creada
    created_task = await collection.find_one({"_id": new_task.inserted_id})
    
    # Convierte el campo `_id` de ObjectId a str antes de retornar
    if created_task:
        created_task["_id"] = str(created_task["_id"])  # Convierte ObjectId a string
    return created_task

async def update_task(id : str, data):
    task = {k:v for k, v in data.dict().items() if v is not None}
    print(task)
    await collection.update_one({'_id': ObjectId(id)}, {'$set': task})
    document = await collection.find_one({'_id' : ObjectId(id)})
    if document:
        document["_id"] = str(document["_id"])
    return document

async def delete_task(id : str):
    await collection.delete_one({'_id': ObjectId(id)} )
    return True