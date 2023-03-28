import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "144c8f8ed6997a",
    pass: "2aa14680c52581",
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/providers/email/templates"),
    },
    viewPath: path.resolve("./src/providers/email/templates"),
    extName: ".html",
  }),
);

export { transport as Nodemailer };
