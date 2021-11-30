const { signup } = require("./signup");
const { login } = require("./login");
const { logout } = require("./logout");
const { updateAvatar } = require("./updateAvatar");
const { verify } = require("./verify");
const { repeatVerify } = require("./repeatVerify");

module.exports = {
  signup,
  login,
  logout,
  updateAvatar,
  verify,
  repeatVerify,
};
