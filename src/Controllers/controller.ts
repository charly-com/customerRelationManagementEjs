import express, { Request, Response, NextFunction } from 'express'
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs'
import httpStatus from "http-status";
import { usersSignUpSchema,options, generateToken, usersLoginSchema } from '../utils/utils';
import User from '../Models/userModel';



export const registerUser = asyncHandler (async (req: Request, res: Response) => {
    
    const {name, email, password, confirm_password} = req.body
    const validateResult = usersSignUpSchema.validate(req.body, options);
    if (validateResult.error) {
      res.status(400).json({
        Error: validateResult.error.details[0].message
      })
    } 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(req.body._id);
    const user = {
      name,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword,
      access_token: token
    };

    const users = await User.create(user);
  
    res.status(200).json({
      message: "User created successfully",
      users,
      token
    })
})

export const loginUser = asyncHandler (async (req: Request, res: Response) => {
     
  const {email, password} = req.body;
  const validateResult = usersLoginSchema.validate(req.body, options);
  if (validateResult.error) {
    res.status(400).json({
      Error: validateResult.error.details[0].message
    })
  }

  const user = await User.findOne({  email } )

  if(!user) {
    res.status(400).json({
      message: "User does not exist"
    })
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "User logged in successfully",
      user
    })
  }

})