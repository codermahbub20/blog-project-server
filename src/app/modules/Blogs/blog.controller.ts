import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = CatchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const blogInfo = req.body;
  const result = await BlogService.createBlogInToDB({
    ...blogInfo,
    author: user._id,
  });
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
