import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInToDB = async (payload: TBlog, authorId: string) => {
  const result = await Blog.create({ ...payload, author: authorId });
  return result;
};

export const BlogService = {
  createBlogInToDB,
};
