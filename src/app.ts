import express, { Application } from 'express';
import cors from 'cors';
import notFoundError from './app/middlewares/notFoundError';
import globalErrorHandler from './app/middlewares/globalErrornHadler';
import router from './app/routes';
import { Request, Response } from 'express-serve-static-core';
import { generateFacultyId } from './app/modules/user/user.utils';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// console.log(app.get("env"))

app.use('/api/v1/', router);

// Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfuly');
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFoundError);

// const academicSemister = {
//   year: '2023',
//   code: '01',
// };

const testId = async () => {
  const result = await generateFacultyId();
  console.log(result);
};
testId();

export default app;
