import Koa from 'koa';
import {router} from "./routes/tasks_routes.js";
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import {PORT} from "./config.js";


const app = new Koa();
app.use(cors())
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
console.log(`Application is running on port ${PORT}`);