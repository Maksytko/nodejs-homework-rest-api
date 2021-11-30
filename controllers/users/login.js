const { User } = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.verify) {
      const error = new Error("Email or password is wrong");
      error.status = 401;
      throw error;
    }

    const compareResult = bcrypt.compareSync(password, user.password);

    if (!compareResult) {
      const error = new Error("Email or password is wrong");
      error.status = 401;
      throw error;
    }

    const payload = {
      id: user._id,
    };
    console.log(SECRET_KEY);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
