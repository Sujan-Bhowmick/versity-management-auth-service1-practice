import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/users.route';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// console.log(app.get("env"))

app.use('/api/v1/users/', userRouter);

// Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
});

export default app;
