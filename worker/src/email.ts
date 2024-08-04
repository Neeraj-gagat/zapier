import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_ENDPOINT,
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });


export async function sendEmail(to: string, body: string){
    await transporter.sendMail({
        from:"randomemail@gmail.com",
        sender:"randomemail@gmail.com",
        to,
        subject:"hello from zapier",
        text:body
    })
} 