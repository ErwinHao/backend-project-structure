const router = require('express').Router();

const { login, register } = require('../../controllers/authController');
const { loginValidator, registerValidator } = require('../../middlewares/dataValidators');

router.post('/login', loginValidator, login)
router.post('/register', registerValidator, register);

module.exports = router;