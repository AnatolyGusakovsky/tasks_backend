import {
  get_all_tasks_DB,
  get_task_DB,
  remove_task_DB,
  save,
  update_task_DB
} from "../models/tasks.dao.js";
import {validateTask} from "./validation_helper.js";
// todo: add payload check by following schema:
// {  id,
//   text,
//   is_completed,
//   is_deleted }
const create_task = async (ctx) => {
  const task = ctx.request.body;
  const task_saved = await save(task);
  if (task_saved) {
    ctx.response.status = 200;
    ctx.body = task;
  } else {
    ctx.response.status = 500;
    ctx.body = 'Error on task saving';
  }
}

const get_all_tasks = async ctx => {
  ctx.body = await get_all_tasks_DB()
}

const get_task = async ctx => {
  const id = ctx.params.id;
  ctx.body = await get_task_DB(id);
}

const delete_task = async ctx => {
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

const update_task = async ctx => {
  const id = ctx.params.id;
  let task = ctx.request.body;
  const validation = validateTask(task)

  if (!validation.isValid) {
    ctx.response.status = 400;
    ctx.body = {message: validation.error_message};
    return;
  }

  try {
    const updatedTask = await update_task_DB(id, task);
    ctx.response.status = 200;
    ctx.body = updatedTask;
  } catch (error) {
    if (error.message.includes("not found")) {
      ctx.response.status = 404;
      ctx.body = {message: error.message};
    } else {
      ctx.response.status = 500;
      ctx.body = {message: "Internal Server Error"};
    }
  }
}

export {create_task, get_all_tasks, get_task, delete_task, update_task}