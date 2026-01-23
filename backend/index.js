import app from './src/app.js';
import connectdb from './src/db.js';
import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})

connectdb()
.then(()=> {
    app.listen(3000, () => {
        console.log("Server listening on port 3000")
    })
})
.catch((error) => {
    console.log(error)
})

