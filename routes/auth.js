const db = require('../db');

const router = require('express').Router();

router.post('/newUser' , async(req,res)=>{
    const data = {
        username : req.body.username, 
        email : req.body.email,
        balance : req.body.balance
    }
    try {
        const newUser =  db.newCustomer(data.username,data.email , data.balance);
        res.status(200).json(newUser4)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router