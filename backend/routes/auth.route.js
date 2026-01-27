import express from 'express';
import { verifyjwt } from '../middleware/verifyjwt.js';

const authroutes = express();

import {
    register, 
    login, 
    logout
} 
from '../controllers/auth.controller.js';


authroutes.post('/register', register);
authroutes.post('/login', login);
authroutes.get('/logout', verifyjwt, logout);


export default authroutes;

