const { Contact } = require("../../model/contact");

const add = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ status: 201, contact });
  } catch (error) {
    next(error);
  }
};

module.exports = { add };
