import express from 'express'
import { getUserProfile, loginUser, signupUser } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/profile', authMiddleware, getUserProfile)

export default router
