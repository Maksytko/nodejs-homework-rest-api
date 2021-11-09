const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contactsOperation = require("../../model/index");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().min(1).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getContactById(contactId);
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
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = joiSchema.validate(body);

    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const contact = await contactsOperation.addContact(body);
    res.status(201).json({ status: 201, contact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId);

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
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    const { error } = joiSchema.validate(body);

    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const contact = await contactsOperation.updateContact(contactId, body);

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
});

module.exports = router;
