const { User } = require("../../model/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { sendMail } = require("../../helpers");

const usersDir = path.join(__dirname, "../../public/users");

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const avatar = gravatar.url(email);
  try {
    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("Email in use");
      error.status = 409;
      throw error;
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const verificationToken = nanoid();
    const mail = {
      to: email,
      subject: "Подтверждение регистрации",
      text: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения</a>`,
    };
    await sendMail(mail);
    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL: avatar,
      verificationToken,
    });

    const usersFolder = path.join(usersDir, String(newUser._id));
    await fs.mkdir(usersFolder);
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
