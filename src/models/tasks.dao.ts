import {client} from './index';
import { ReturnDocument } from 'mongodb';

const tasks = client.db('koa').collection('tasks');


const save = async (task_obj:any) => {
  const db_resp = await tasks.insertOne(task_obj);
  return db_resp.acknowledged;
}

const get_all_tasks_DB = async () => {
  const cursor = await tasks.find({}, { projection: { _id: 0 } });
  return cursor.toArray();
}

const get_task_DB = async (id: string) => {
  const task = await tasks.findOne({id: id}, { projection: { _id: 0 } });
  return task || 'No task found!';
}

const update_task_DB = async (id:string, fields_to_update_obj:any) => {
  const options = {
    returnDocument: ReturnDocument.AFTER,
    projection: {}
  };

  const result = await tasks.findOneAndUpdate({ id: id }, { $set: fields_to_update_obj }, options);

  if (result) {
    return result;
  }
  else {
    throw new Error(`Failed to update the task with id ${id}`);
  }
}

const remove_task_DB = async (id:string) => {
  const db_resp = await tasks.deleteOne({id: id});
  return db_resp.deletedCount !== 0;
}

export {save, get_all_tasks_DB, get_task_DB, update_task_DB, remove_task_DB}