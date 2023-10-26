import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  name: process.env.MAIL_HOST,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    ciphers: process.env.MAIL_TLS_CIPHER,
  },
});

export async function sendVerificationLink(receiverEmail, token) {
  await transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: receiverEmail,
      subject: "Drinkify - Weryfikacja Email",
      html: `
        <div style="background:linear-gradient(0deg, #510a32 0%, rgba(45,20,44,1) 50%); max-width:35rem;padding:2rem;">
      <table
        style="padding: 2rem; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; width:100%;">
        <tr>
          <td><h2 style="color:white;text-align: center; vertical-align: middle;">Cześć!</h2></td> 
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle; padding-bottom:1rem;">
          <h4 style="color:white;">
          Zweryfikuj swój adres email klikając ten link:
        </h4>
          </td> </tr>
        
        <tr><td style="text-align: center; vertical-align: middle;">
          <a href="${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/verification/email?token=${token}"
        style="color:white; background-color: #120216;padding: 1rem 2rem; border-radius: 1rem;text-decoration: none;" />
        </td></tr>
        
          <tr>
            <td style="text-align: center; vertical-align: middle; color:white;padding-top:2rem;">
              <span style="color:white">W razie jakichkolwiek problemów skontaktuj się z nami</span>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; vertical-align: middle; color:white;">
              <img src="https://res.cloudinary.com/dswot6gxk/image/upload/v1682446799/logo-no-background_s8uon2.png"
            style="max-width: 8rem; margin-top: 1rem;" />
            </td>
          </tr>
      </table>
    </div>
        `,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        console.log(
          `Verification email sent to ${receiverEmail}: ${info.response}`
        );
      }
    }
  );
}
