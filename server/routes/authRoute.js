const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const AuthController = require('../controllers/authController');
const { validateBody, validateParam, schemas } = require('../helpers/routeHelper');

const passportJWT = passport.authenticate('jwt', { session: false });
const passportLogin = passport.authenticate('local', { session: false });

router.post('/register', validateBody(schemas.registerSchema), AuthController.register);
router.post('/login', validateBody(schemas.loginSchema), passportLogin, AuthController.login);
router.post('/forgot-password', validateBody(schemas.forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', validateBody(schemas.resetPasswordSchema), AuthController.resetPassword);
router.post('/verify-email/:token', AuthController.verifyEmail);
router.get('/me', passportJWT, AuthController.me);

module.exports = router;
