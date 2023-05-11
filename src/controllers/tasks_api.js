import {get_all_tasks_DB, get_task_DB, remove_task, save, update} from "../models/tasks.dao.js";

const create_task = async (ctx) => {
  const task = ctx.request.body;
  const task_saved_successfully = await save(task);
  if (task_saved_successfully) {
    ctx.response.status = 200;
    ctx.body = task;
  } else {
    ctx.response.status = 500;
    ctx.body = 'Error on task saving';
  }
}

const get_all_tasks = async (ctx) => {
  ctx.body = await get_all_tasks_DB()
}

const get_task = async id => {
  return await get_task_DB(id);
}

const delete_task = async id => {
  return await remove_task(id);
}

const update_task = async ({
                             id,
                             text,
                             is_completed,
                             is_deleted
                           }) => {
  return await update({
    id,
    text,
    is_completed,
    is_deleted
  });
}

export {create_task, get_all_tasks, get_task, delete_task, update_task}