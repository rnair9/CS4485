"use server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'causeway4dmin@gmail.com',
    pass: 'prul xbld muhx bgpe',
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'causeway4dmin@gmail.com',
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;