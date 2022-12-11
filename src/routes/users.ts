import express from 'express';

import { loginUser, registerUser,  addCustomer, getCustomers} from '../Controllers/userController';
import { protect } from '../middleware/authMiddleware';


const router = express.Router();
 
router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/add', protect, addCustomer)

router.get('all', protect, getCustomers)


export default router;