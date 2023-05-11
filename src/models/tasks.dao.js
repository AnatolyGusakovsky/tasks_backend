import {client} from './index.js';

const tasks = client.db('koa').collection('tasks');


const save = async ({
                      id,
                      text,
                      is_completed,
                      is_deleted
                    }) => {
  const db_resp = await tasks.insertOne({
    id,
    text,
    is_completed,
    is_deleted
  });
  let task_saved;
  db_resp.acknowledged ?
    task_saved = true
    : task_saved = false;
  return task_saved
}

const get_all_tasks_DB = async () => {
  const cursor = await tasks.find();
  return cursor.toArray();
}

const get_task_DB = async (id) => {
  return await tasks.findOne({id: id}) || 'No tasks found!';
}

const update_task_DB = async ({
                                id,
                                text,
                                is_completed,
                                is_deleted
                              }) => {
  const db_resp = await tasks.replaceOne({id: id}, {
    id,
    text,
    is_completed,
    is_deleted
  });
// todo: 1. now id is getting from body, but need to be getting from url params
  //todo: 2. prevent editing id

  let task_updated;
  db_resp.modifiedCount > 0 ?
    task_updated = true
    : task_updated = false;
  return task_updated
}

const remove_task_DB = async id => {
  const db_resp = await tasks.deleteOne({id: id});

  if (db_resp.deletedCount === 0)
    return 'Task with provided id not found. Deletion failed.'

  let task_removed;
  db_resp.acknowledged ?
    task_removed = true
    : task_removed = false;
  return task_removed
}

export {save, get_all_tasks_DB, get_task_DB, update_task_DB, remove_task_DB}