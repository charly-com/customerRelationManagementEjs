import express, { Request, Response, NextFunction } from 'express'
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs'
import httpStatus from "http-status";
import { usersSignUpSchema,options, generateToken, usersLoginSchema } from '../utils/utils';
import User from '../Models/userModel';
import Customer from '../Models/customerModel'
import { JwtPayload } from 'jsonwebtoken';



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
      _id: users._id,
      name: users.name,
      email: users.email,
      access_token: users.access_token
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

  if (user && (await bcrypt.compare(password, user.password) )) {
    const token = generateToken(user._id);
  
    res.status(200).json({
      message: "User logged in successfully",
      user,
      token
    })
  }

})

export const getCustomers = asyncHandler (async (req: Request, res: Response) => {
  const token = req.cookies.token;
    let user;
    if(token){
      user = req.cookies.user
    }

    const customers = await Customer.find({})
    res.status(200).json({
      message: "Customers fetched successfully",
    })
})

export const addCustomer = asyncHandler (async (req:JwtPayload, res: Response, next: NextFunction) => {
  const id = req.user._id;
  const {fullname, email, gender, phone, address, notes} = req.body;
  const user = await User.findOne({ _id: id })
  if(!user) {
    res.status(400).json({
      message: "User does not exist"
    })
  }

  const customer = await Customer.create({
    fullname: req.body.fullname,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    notes: req.body.notes
  })
})
