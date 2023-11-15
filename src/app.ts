import express, { Application, NextFunction, Request, Response } from 'express';

import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import ApiError from './error/ApiError';
import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (res: Response) => {
//   res.send('Express + TypeScript Server');
//   // throw new ApiError(400,"Bad request")
// });

app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found!',
      },
    ],
  });
  next();
});
export default app;
