import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInToDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

export const BlogService = {
  createBlogInToDB,
};