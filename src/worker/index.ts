import { Hono } from "hono";
import api from '../api';

const app = new Hono<{ Bindings: Env }>();

app.route('/', api);

export default app;
