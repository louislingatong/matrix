const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const UserController = require('../controllers/userController');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelper');

const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/', passportJWT, UserController.index);
router.get('/:userId', validateParam(schemas.idSchema, 'userId'), passportJWT, UserController.getUser);
router.put('/:userId', validateParam(schemas.idSchema, 'userId'), passportJWT, UserController.replaceUser);
router.patch('/:userId', validateParam(schemas.idSchema, 'userId'), passportJWT, UserController.updateUser);
router.get('/:userId/members', validateParam(schemas.idSchema, 'userId'), passportJWT, UserController.getMembers);

module.exports = router;