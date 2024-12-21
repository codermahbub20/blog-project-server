import { RequestHandler } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog: RequestHandler = CatchAsync(async (req, res) => {
  const BlogData = req.body;
  const author = req.user as JwtPayload;
  console.log('req.user:', req.user);

  // Add the author's ID to the blog data
  const result = await BlogService.createBlogInToDB({
    ...BlogData,
    author: author.id,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

// Get all blogs
const getAllBlogs: RequestHandler = CatchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

// Update blog

const updateBlog: RequestHandler = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const BlogData = req.body;
  const author = req.user as JwtPayload;

  // Add the author's ID to the blog data
  const result = await BlogService.updateBlogFromDB(id, {
    ...BlogData,
    author: author.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog Updated successfully',
    data: result,
  });
});

// delete blog
const deleteBlog: RequestHandler = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const BlogData = req.body;
  const author = req.user as JwtPayload;

  // Add the author's ID to the blog data
  await BlogService.deleteBlogFromDB(id, { ...BlogData, author: author.id });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
