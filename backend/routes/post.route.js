import express from 'express';
import { verifyjwt } from '../middleware/verifyjwt.js';

import { 
    getposts,
    getpost,
    getpostsbytopic,
    generatepost,
    generatemultipleposts,
    likepost,
    unlikepost,
    savepost,
    unsavepost,
    getlikes,
    deletepost
} 
from '../controllers/post.controller.js'; 

const postroutes = express();

postroutes.get('/', getposts);
postroutes.get('/topic/:topic', getpostsbytopic);
postroutes.get('/getpost/:postid', getpost);
postroutes.get('/like/:postid', verifyjwt, likepost);
postroutes.get('/unlike/:postid', verifyjwt, unlikepost);
postroutes.get('/save/:postid', verifyjwt, savepost);
postroutes.get('/unsave/:postid', verifyjwt, unsavepost);
postroutes.get('/getlikes/:postid', getlikes);
postroutes.post('/createpost', verifyjwt, generatepost);
postroutes.post('/createposts', verifyjwt, generatemultipleposts);
postroutes.delete('/deletepost/:postid', verifyjwt, deletepost)


export default postroutes;