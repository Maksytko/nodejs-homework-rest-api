const { Contact } = require("../../model/contact");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.json({ contact });
    } else {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getById };
