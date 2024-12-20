import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandaler';
// import notFound from './app/middlewares/notFound';

const app: Application = express();

// parsers use
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Blog Project Server!');
});

//Not Found
// app.use(notFound);

export default app;
