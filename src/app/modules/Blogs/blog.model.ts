import { model, Schema } from 'mongoose';
import { BlogModel, TAuthor, TBlog } from './blog.interface';

const authorSchema = new Schema<TAuthor>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: authorSchema,
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

blogSchema.statics.isBLogDeleted = async function (id: string) {
  const DeletedBlog = await this.findOne({ _id: id, isDeleted: true });
  return DeletedBlog;
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
