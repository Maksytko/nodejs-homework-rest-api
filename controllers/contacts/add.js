const { Contact } = require("../../model/contact");

const add = async (req, res, next) => {
  const newContact = { ...req.body, owner: req.user._id };
  try {
    const contact = await Contact.create(newContact);
    res.status(201).json({ status: 201, contact });
  } catch (error) {
    next(error);
  }
};

module.exports = { add };
