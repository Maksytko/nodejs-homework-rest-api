const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "josliy@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) => {
  const email = { ...data, from: "josliy@meta.ua" };
  await transporter.sendMail(email);
  return true;
};

module.exports = { sendMail };
