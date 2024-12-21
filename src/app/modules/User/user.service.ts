import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInToDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const users = await User.find().exec();
  return users;
};

export const UserServices = {
  createUserInToDB,
  getAllUserFromDB,
};
