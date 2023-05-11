import {get_all_tasks_DB, get_task_DB, remove_task_DB, save, update_task_DB} from "../models/tasks.dao.js";

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
  // const id = ctx.params.id;
  let task = ctx.request.body;
  const task_updated = await update_task_DB(task);
  if (task_updated) {
    ctx.response.status = 200;
    ctx.body = 'Task updated successfully';
  } else {
    ctx.response.status = 500;
    ctx.body = 'Error while updating task';
  }


}

export {create_task, get_all_tasks, get_task, delete_task, update_task}