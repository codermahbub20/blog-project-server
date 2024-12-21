/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TAuthor = {
  name: string;
  email: string;
  role: string;
};

export type TBlog = {
  title: string;
  content: string;
  author?: TAuthor;
  isPublished: boolean;
  isDeleted: boolean;
};

export interface BlogModel extends Model<TBlog> {
  isBLogDeleted(id: string): Promise<TBlog | null>;
}
