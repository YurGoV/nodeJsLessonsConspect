const express = require('express');

const {
  signup,
  login,
  getOTP,
  resetPassword,
} = require('../controllers/authController');
const { checkSignupData } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', checkSignupData, signup);
router.post('/login', login);
router.post('/restore-password', getOTP);
router.patch('/restore-password/:otp', resetPassword);

module.exports = router;
