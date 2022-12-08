import express, { Request, Response } from 'express'
import logger from 'morgan';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();


mongoose.set('strictQuery', true);
mongoose.connect(process.env.Database_Url!, () => {
    console.log("Database connected");
})

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})