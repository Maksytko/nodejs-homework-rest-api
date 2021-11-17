const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer") {
      const error = new Error("Not authorized");
      error.status = 401;
      throw error;
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);

      if (!user) {
        const error = new Error("Not found");
        error.status = 400;
        throw error;
      }

      if (!user.token) {
        const error = new Error("Not authorized");
        error.status = 401;
        throw error;
      }
      req.user = user;
      next();
    } catch (error) {
      const err = new Error(error.message);
      err.status = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };
