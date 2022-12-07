import express, { Request, Response } from 'express'
import logger from 'morgan';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();


mongoose.set('strictQuery', true);
mongoose.connect(process.env.Database_Url!, () => {
    console.log("Database connected");
})


const app = express();

app.use(logger('dev'));

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})