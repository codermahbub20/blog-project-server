import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { blogRoutes } from '../modules/Blogs/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
