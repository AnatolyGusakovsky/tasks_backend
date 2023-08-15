import Koa from 'koa';
import {router} from "./routes/tasks_routes.js";
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

// import dotenv from 'dotenv'
// dotenv.config()

const app = new Koa();
app.use(cors())
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
// app.listen(process.env.PORT);
// console.log(`Application is running on port ${process.env.PORT}`);
app.listen(3000);
console.log(`Application is running on port ${3000}`);