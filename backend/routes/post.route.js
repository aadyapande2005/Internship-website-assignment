import express from 'express';
import { verifyjwt } from '../middleware/verifyjwt.js';

import { 
    getposts,
    getpost,
    generatepost,
    likepost,
    unlikepost,
    getlikes,
    deletepost
} 
from '../controllers/post.controller.js'; 

const postroutes = express();

postroutes.get('/', getposts);
postroutes.get('/getpost/:postid', getpost);
postroutes.get('/like/:postid', verifyjwt, likepost);
postroutes.get('/unlike/:postid', verifyjwt, unlikepost);
postroutes.get('/getlikes/:postid', getlikes);
postroutes.post('/createpost', verifyjwt, generatepost);
postroutes.delete('/deletepost/:postid', verifyjwt, deletepost)


export default postroutes;