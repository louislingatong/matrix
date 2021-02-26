const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const AuthController = require('../controllers/authController');
const { validateBody, schemas } = require('../helpers/routeHelper');

const passportJWT = passport.authenticate('jwt', { session: false });
const passportLogin = passport.authenticate('local', { session: false });

router.route('/register')
  .post(validateBody(schemas.registerSchema), AuthController.register);

router.route('/login')
  .post(validateBody(schemas.loginSchema), passportLogin, AuthController.login);

router.route('/forgot-password')
  .post(validateBody(schemas.forgotPasswordSchema), AuthController.forgotPassword);

router.route('/reset-password')
  .post(validateBody(schemas.resetPasswordSchema), AuthController.resetPassword);

router.route('/verify-email/:token')
  .post(AuthController.verifyEmail);

router.route('/me')
  .get(passportJWT, AuthController.me);

module.exports = router;
