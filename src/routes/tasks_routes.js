import {create_task, delete_task, get_all_tasks, get_task, update_task} from "../controllers/tasks_api.js";

import Router from "@koa/router";


const router = new Router({
  prefix: '/tasks'
})

router.get('/', get_all_tasks)

router.post('/', create_task)

router.get('/:id', get_task)

router.delete('/:id', delete_task)

router.put('/:id', update_task)

export {router}