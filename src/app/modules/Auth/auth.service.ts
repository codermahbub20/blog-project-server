import { User } from '../User/user.model';

const register = async (payload: string) => {
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  register,
};
