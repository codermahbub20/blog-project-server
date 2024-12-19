import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserInToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Created Is successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
