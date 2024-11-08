import express from 'express'
import { registerUser, loginUser, logoutUser } from '../functions/userFunctions.js'
import { uploadFile } from '../functions/postFunctions.js'
import verifyToken from '../functions/verifyJwtToken.js'
import { verifyTokenAtHome } from '../functions/verifyJwtToken.js'


const router = express.Router()
const app = express()

router.get('/verifyTokenAtHome', verifyTokenAtHome)

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout',logoutUser)


export default router;
