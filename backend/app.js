import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())


import authroutes from './routes/auth.route.js';
import postroutes from './routes/post.route.js';
import userroutes from './routes/user.route.js';

app.use('/auth', authroutes);
app.use('/post', postroutes);
app.use('/user', userroutes);


