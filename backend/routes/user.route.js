import express from 'express';
import { verifyjwt } from '../middleware/verifyjwt.js';

const userroutes = express();

import { 
    getuser, 
    getusers,
    updateuser,
    deleteuser,
    getuserlikes,
    getusersavedposts
} 
from '../controllers/user.controller.js';


userroutes.get('/', getusers);
userroutes.get('/public/:userid', getuser);
userroutes.get('/profile/:userid', verifyjwt, getuser);
userroutes.get('/post/liked', verifyjwt, getuserlikes);
userroutes.get('/post/saved', verifyjwt, getusersavedposts);
userroutes.put('/:userid', verifyjwt, updateuser)
userroutes.delete('/:userid', verifyjwt, deleteuser);


export default userroutes;