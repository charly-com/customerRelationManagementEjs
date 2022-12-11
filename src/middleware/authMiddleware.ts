import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/userModel';


export const protect = asyncHandler(async (req: JwtPayload, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (process.env.JWT_SECRET) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById((decoded: { id: any; }) => decoded.id).select('-password');
                next();
            }
        } catch (err) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})


export default protect;
