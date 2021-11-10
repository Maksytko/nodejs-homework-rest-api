const { add } = require("./add");
const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { updateById } = require("./updateById");
const { removeById } = require("./removeById");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  removeById,
  updateStatusContact,
};
