import express from 'express';
import { verifyjwt } from '../middleware/verifyjwt.js';

const userroutes = express();

import { 
    getuser, 
    getusers,
    updateuser,
    deleteuser
} 
from '../controllers/user.controller.js';


userroutes.get('/', getusers);
userroutes.get('/:userid', verifyjwt, getuser);
userroutes.put('/:userid', verifyjwt, updateuser)
userroutes.delete('/:userid', verifyjwt, deleteuser);


export default userroutes;