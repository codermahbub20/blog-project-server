import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/CatchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';
import AppError from '../Errors/AppError';

const auth = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized user');
    }

    // check if the token are valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const user = await User.findById(decoded.id);

    //   checking is the user already blocked
    const isUserBlocked = user?.isBlocked;
    if (isUserBlocked) {
      throw new AppError(404, 'This user is already blocked');
    }

    next();
  });
};

export default auth;
