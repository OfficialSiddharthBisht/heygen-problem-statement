// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';

dotenv.config({path:"./config.env"});

const app = express();


//implementation
const jobStatus = {
    status:"pending",
    startTime:Date.now()
}
const DELAY = 15000;

app.get('/status',(req,res)=>{
    const elapsedTime = Date.now() - jobStatus.startTime;
    if(elapsedTime >= DELAY && jobStatus.status === "pending"){
        jobStatus.status = Math.random() > 0.2 ? 'completed':'error'
    }
  
    res.json({
        result: jobStatus.status
    })
});


const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

