import express from 'express'
import { registerUser, verifyUser } from '../functions/userFunctions.js'


const router = express.Router()

router.post('/register', registerUser)

router.post('/login', verifyUser)

export default router;
