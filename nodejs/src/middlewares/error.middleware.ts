import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { inspect } from 'util';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${inspect(message)}`);
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${inspect(message)}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
