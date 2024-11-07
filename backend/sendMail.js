import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "",
      pass: "",
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function sendMail(to,subject,text,html) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '', // sender address
      to, // list of receivers
      subject,
      text,
      html,
    });
  }
  
export {sendMail} ;
