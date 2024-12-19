import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = CatchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlogInToDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
};
