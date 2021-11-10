const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts/");
const { joiSchema } = require("../../model/contact");

const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      next(err);
    }

    next();
  };
};

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validation(joiSchema), add);

router.delete("/:contactId", removeById);

router.patch("/:contactId", validation(joiSchema), updateById);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
