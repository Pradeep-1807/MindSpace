import express from 'express'
import { registerUser, loginUser } from '../functions/userFunctions.js'
import { getPosts } from '../functions/postFunctions.js'
import verifyToken from '../functions/verifyJwtToken.js'
import { verifyTokenAtHome } from '../functions/verifyJwtToken.js'


const router = express.Router()

router.get('/verifyTokenAtHome', verifyTokenAtHome)

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/posts',verifyToken, getPosts)

export default router;
