const Joi = require('@hapi/joi');
const { responseError } = require('./errorHelper');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = schema.validate({ param: req['params'][name]});
      if (result.error) {
        const message = result.error.details[0].message;
        return responseError(res, 400, message);
      }
      next();
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
         const name = result.error.details[0].context.label;
         const message = result.error.details[0].message;
        return responseError(res, 422, {[name]: message});
      }
      next();
    }
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    registerSchema: Joi.object().keys({
      code: Joi.string(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),

    loginSchema: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),

    forgotPasswordSchema: Joi.object().keys({
      email: Joi.string().email().required(),
    }),

    resetPasswordSchema: Joi.object().keys({
      token: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    }),
  }
};
