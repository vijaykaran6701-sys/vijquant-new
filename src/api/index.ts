import { Hono } from 'hono';
import inquiries from './inquiries';
import blog from './blog';
import testimonials from './testimonials';
import portfolio from './portfolio';
import auth from './auth';

const api = new Hono<{ Bindings: Env }>();

api.route('/auth', auth);
api.route('/inquiries', inquiries);
api.route('/blog', blog);
api.route('/testimonials', testimonials);
api.route('/portfolio', portfolio);

export default api;
