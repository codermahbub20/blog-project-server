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

// Update blog

const updateBlog = CatchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { blogId } = req.params;
  const blogData = req.body;

  const updatedBlog = await BlogService.updateBlogFromDB(
    blogId,
    user._id,
    blogData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});

// delete blog
const deleteBlog = CatchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { blogId } = req.params;

  const result = await BlogService.deleteBlogFromDB(blogId, user._id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
};
