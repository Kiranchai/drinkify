import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index";
import verificationEmailTemplate from "@/app/templates/verificationEmailTemplate";
import passwordResetEmailTemplate from "@/app/templates/passwordResetEmailTemplate";

const transporter = nodemailer.createTransport(
  new SMTPTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      ciphers: process.env.MAIL_TLS_CIPHER,
    },
  })
);

export async function sendVerificationLink(receiverEmail, token) {
  const mailData = {
    from: "No reply <contact@drinkify.pl>",
    to: receiverEmail,
    subject: "Drinkify - Weryfikacja Email",
    html: verificationEmailTemplate(token),
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(
          `Verification email sent to ${receiverEmail}: ${info.response}`
        );
        resolve(info);
      }
    });
  });
}

export async function sendPasswordResetLink(receiverEmail, token) {
  const mailData = {
    from: "No reply <contact@drinkify.pl>",
    to: receiverEmail,
    subject: "Drinkify - Zmiana hasła",
    html: passwordResetEmailTemplate(token),
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(
          `Password reset link sent to ${receiverEmail}: ${info.response}`
        );
        resolve(info);
      }
    });
  });
}
