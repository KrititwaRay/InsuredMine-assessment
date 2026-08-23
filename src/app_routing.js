import express from "express";
const app = express();

import { user_routing } from "./domain/user/routes/user.routes.js";
import { message_routing } from "./domain/message/routes/message.routes.js";

app.use('/user', user_routing);
app.use('/messages', message_routing);

export const app_route = app;