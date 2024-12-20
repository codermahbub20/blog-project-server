import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const register = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const AuthController = {
  register,
};
