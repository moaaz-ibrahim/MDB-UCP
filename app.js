const express= require('express');
const app = express();
const db=require('./db.js');
const auth = require('./routes/auth');

app.use(express.json())
app.use('/api/db' , auth);

app.get('/getData' , (req,res)=>{
    
})


app.listen(3000 , console.log('on port 3000....'))