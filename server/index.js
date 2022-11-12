// const express = require("express");
// its may be converted to ES. to write ES need to add "type":"module" in package.json then run> npm install
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//access router folder
import authRouter from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";


const app = express();
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(()=> {
        console.log("connected to MongoDB")
    }).catch(err=> { throw err;})
}


app.use(cookieParser());

app.use(express.json());

// index.js > router/auth.js > controller/auth.js > models/User.js
app.use("/api/auth", authRouter);

// index.js > router/users.js > controller/user.js 
app.use("/api/users", userRoutes);

// index.js > router/videos.js > controller/video.js
app.use("/api/videos", videoRoutes);

// index.js > router/comments.js > controller/comment.js
app.use("/api/comments", commentRoutes);


// middle ware for error handling 
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Somethings went wrong!";
    return res.status(status).json({
        success: false,
        status: status,
        message: message
    });
})




app.listen(8800, () => {
    connect();
    console.log("Connected to Server Port: 8800");
});
