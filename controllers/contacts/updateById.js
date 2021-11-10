const { Contact } = require("../../model/contact");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const contact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    if (contact) {
      res.json({ contact });
    } else {
      const err = new Error("Not found");
      err.status = 404;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { updateById };
