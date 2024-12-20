import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInToDB = async (payload: TBlog) => {
  const newBlog = await Blog.create(payload);
  const result = await newBlog.populate('author', 'name email');
  return result;
};

// Update blog from database

const updateBlogFromDB = async (
  blogId: string,
  userId: string,
  updates: Partial<TBlog>,
) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    { _id: blogId, author: userId },
    updates,
    { new: true, runValidators: true },
  ).populate('author', 'name email');

  return updatedBlog;
};

// deleteBlog from database

const deleteBlogFromDB = async (blogId: string, userId: string) => {
  const result = await Blog.findByIdAndDelete({ _id: blogId, author: userId });
  return result;
};

export const BlogService = {
  createBlogInToDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
