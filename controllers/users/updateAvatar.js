const { User } = require("../../model/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const usersDir = path.join(__dirname, "../../public/users");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  try {
    Jimp.read(tempUpload)
      .then((image) => {
        return image.resize(250, 250).write(originalname);
      })
      .catch((err) => {
        throw err;
      });
    const avatar = path.join("/users", `${_id}`, originalname);
    const resultUpload = path.join(usersDir, `${_id}`, originalname);
    await fs.rename(tempUpload, resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL: avatar });
    res.status(200).json({ avatarURL: avatar });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = { updateAvatar };
