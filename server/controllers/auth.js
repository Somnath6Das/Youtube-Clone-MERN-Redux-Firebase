import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {
        //to get api post request in console
        // console.log(req.body);
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({...req.body, password: hash});
            // to save password to mongodb
            await newUser.save();
            res.status(200).send("User has been created!");
        }catch(err){
            next(err
                // to call the error handling function  > error.js
                //createError(404, "not found sorry!")
                );
        }
}

export const signin = async (req, res, next) => {
    try{
        const user = await User.findOne({name:req.body.name});
        if(!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
       
        if(!isCorrect) return next(createError(400, "Wrong credential!"))

        const token = jwt.sign({id:user._id}, process.env.JWT);

        //don't send password and _doc on post api
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);

    }catch(err){
        next(err);
    }
};