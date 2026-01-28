import express from 'express';
import { verifyjwt } from '../middleware/verifyjwt.js';

const authroutes = express();

import {
    register, 
    login, 
    logout,
    isLoggedIn
} 
from '../controllers/auth.controller.js';


authroutes.post('/register', register);
authroutes.post('/login', login);
authroutes.get('/logout', verifyjwt, logout);
authroutes.get('/islogin', verifyjwt, isLoggedIn);


export default authroutes;

