const { Contact } = require("../../model/contact");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  console.log(contactId);
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (contact) {
      res.status(200).json({ status: 200, contact });
    } else {
      const err = new Error("Not found");
      err.status = 404;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { updateStatusContact };
