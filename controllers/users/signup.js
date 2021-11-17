const { User } = require("../../model/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("Email in use");
      error.status = 409;
      throw error;
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({ email, password: hashPassword });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
