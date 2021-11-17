const express = require("express");
const router = express.Router();
const { login, logout, signup } = require("../../controllers/users/");
const { joiSchema } = require("../../model/user");
const { authenticate } = require("../../middlewares/authenticate");

const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      next(err);
    }

    next();
  };
};

router.post("/signup", validation(joiSchema), signup);
router.post("/login", validation(joiSchema), login);
router.post("/logout", authenticate, logout);
module.exports = router;
