import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInToDB = async (payload: TBlog) => {
  const newBlog = await Blog.create(payload);
  const result = await newBlog.populate('author', 'name email');
  return result;
};

export const BlogService = {
  createBlogInToDB,
};
