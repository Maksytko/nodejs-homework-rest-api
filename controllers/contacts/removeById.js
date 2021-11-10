const { Contact } = require("../../model/contact");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (result) {
      res.json({ message: "contact deleted" });
    } else {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { removeById };
