const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const UserController = require('../controllers/userController');
const { validateParam, schemas } = require('../helpers/routeHelper');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(passportJWT, UserController.index);

router.route('/:userId')
  .get(passportJWT, validateParam(schemas.idSchema, 'userId'), UserController.getUser);

module.exports = router;