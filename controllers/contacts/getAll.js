const { Contact } = require("../../model/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const contacts = await Contact.find({ owner: _id }).populate(
      "owner",
      "_id email"
    );
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll };
