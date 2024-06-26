import {
  get_all_tasks_DB,
  get_task_DB,
  remove_task_DB,
  save,
  update_task_DB
} from "../models/tasks.dao";
import {validateTask} from "./validation_helper";

const create_task = async (ctx:any) => {
  const task = ctx.request.body;
  const validation = validateTask(task, 'POST')

  if (!validation.isValid) {
    ctx.response.status = 400;
    ctx.body = {message: validation.error_message};
    return;
  }
  const task_saved = await save(task);
  if (task_saved) {
    ctx.response.status = 201;
    ctx.body = task;
  } else {
    ctx.response.status = 500;
    ctx.body = 'Error on task saving';
  }
}

const get_all_tasks = async (ctx: any) => {
  ctx.body = await get_all_tasks_DB()
}

const get_task = async (ctx: any) => {
  const id = ctx.params.id;
  ctx.body = await get_task_DB(id);
}

const delete_task = async (ctx: any) => {
  const id = ctx.params.id;

  let task_removed = await remove_task_DB(id);
  if (task_removed) {
    ctx.body = `Task with id ${id} deleted successfully`
    ctx.response.status = 200;
  } else {
    ctx.body = `Deletion task with id ${id} failed.`
    ctx.response.status = 500;
  }
}

const update_task = async (ctx: any) => {
  const id = ctx.params.id;
  let task = ctx.request.body;
  const validation = validateTask(task, 'PUT')

  if (!validation.isValid) {
    ctx.response.status = 400;
    ctx.body = {message: validation.error_message};
    return;
  }

  try {
    const updatedTask = await update_task_DB(id, task);
    ctx.response.status = 200;
    ctx.body = updatedTask;
  } catch (error:any) {
      ctx.response.status = 404;
      ctx.body = {message: error.message};
  }
}

export {create_task, get_all_tasks, get_task, delete_task, update_task}