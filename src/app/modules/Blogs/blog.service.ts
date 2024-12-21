import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../Errors/AppError';
import { User } from '../User/user.model';
import { blogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInToDB = async (payload: TBlog) => {
  // Create a new blog post
  const author = await User.findById(payload.author).select('name email role');
  console.log('Author', author);
  if (!author) {
    throw new AppError(404, 'Author not found');
  }
  const BlockedUser = await User.isUserBlocked(author?.email);
  if (BlockedUser) {
    throw new AppError(404, `The user is blocked `);
  }
  const blogData = {
    ...payload,
    author: {
      name: author?.name,
      email: author?.email,
      role: author?.role,
    },
  };
  const result = await Blog.create(blogData);
  return result;
};

// get all blogs from database
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const BLogs = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await BLogs.modelQuery;

  return result;
};

// Update blog from database

const updateBlogFromDB = async (id: string, payload: TBlog) => {
  // Find the blog by ID
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(401, 'Blog not found');
  }

  const author = await User.findById(payload.author);
  if (!author || blog.author?.email !== author.email) {
    throw new AppError(401, 'You are not the author of this blog');
  }
  const deletedBlog = await Blog.isBLogDeleted(id);
  if (deletedBlog) {
    throw new AppError(401, 'Blog is Deleted');
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title: payload.title,
      content: payload.content,
    },
    { new: true },
  );

  return updatedBlog;
};
// deleteBlog from database

const deleteBlogFromDB = async (id: string, payload: TBlog) => {
  // Find the blog by ID
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(401, 'Blog not found');
  }
  const author = await User.findById(payload.author);
  if (!author || blog.author?.email !== author.email) {
    throw new AppError(401, 'Only the author can delete the blog');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );

  return updatedBlog;
};

export const BlogService = {
  createBlogInToDB,
  updateBlogFromDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
