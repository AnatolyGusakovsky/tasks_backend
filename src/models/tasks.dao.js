import {client} from './index.js';

const tasks = client.db('koa').collection('tasks');


const save = async (task_obj) => {
  const db_resp = await tasks.insertOne(task_obj);
  return db_resp.acknowledged;
}

const get_all_tasks_DB = async () => {
  const cursor = await tasks.find();
  return cursor.toArray();
}

const get_task_DB = async (id) => {
  return await tasks.findOne({id: id}) || 'No tasks found!';
}

const update_task_DB = async (id, fields_to_update_obj) => {
  const db_resp = await tasks.updateOne({id: id}, {$set: fields_to_update_obj});
  return db_resp.modifiedCount > 0;
}

const remove_task_DB = async id => {
  const db_resp = await tasks.deleteOne({id: id});
  return db_resp.deletedCount !== 0;
}

export {save, get_all_tasks_DB, get_task_DB, update_task_DB, remove_task_DB}