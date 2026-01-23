import express from 'express';

const authroutes = express();

import {
    register, 
    login, 
    logout
} 
from '../controllers/auth.controller.js';


authroutes.post('/register', register);
authroutes.post('/login', login);
authroutes.get('/logout', logout);




export default authroutes;

