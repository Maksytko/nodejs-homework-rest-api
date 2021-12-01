const { User } = require("../../model/user");
const { sendMail } = require("../../helpers");

const repeatVerify = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Missing required field email");
      error.status = 400;
    }

    const user = User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.status = 401;
      throw error;
    }

    if (user.verify) {
      const error = new Error("Verification has already been passed");
      error.status = 400;
      throw error;
    }

    const mail = {
      to: email,
      subject: "Подтверждение регистрации",
      text: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите для подтверждения</a>`,
    };

    await sendMail(mail);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = { repeatVerify };
