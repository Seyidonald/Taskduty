import express, { json } from 'express'; // the middleware is passed in between the import express in a json format
import dotenv from 'dotenv';
import createHttpErrors, { isHttpError } from 'http-errors';
import userRoutes from './routes/user.js';
import cors from 'cors'

//b4 we initialise our express we want d info from env file to read so we do

dotenv.config(); //loads environmental variable from .env file
//setting up the express
//a middle ware for pasing info. how we senfd info from the backend to d frontend
const app = express();
app.use(cors())
app.use(json()); // then we call the json format here

//then we create our routes
app.get('/', (req, res) => {
  //d 1st route is d hom route & all servers & api calls must return a response..
  res.send('Hello express'); //gt d equest frm the fronend & send back a response. a success or a failure
});

app.use('/api/user', userRoutes);

//1 more installation b4 we start server bcos nodes dont save our files, so we want smtin dt can install our server wen there is a change.. we install nodemon. compiles changes n start application again

//error for noo routes i.e API
app.use((req, res, next) => {
  next(createHttpErrors(400, 'Endpoint not found'));
});

//General and specific errors
app.use((req, res, next) => {
  console.log(error);
  letErrorMessage = 'An unknown error ha occured';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error, errorMessage });
});

export default app;
