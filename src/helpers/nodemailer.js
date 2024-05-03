import nodemailer from 'nodemailer';

import { env } from './index.js';

const MAIL_USER = env('MAIL_USER');
const MAIL_PASS = env('MAIL_PASS');

export const transporter = nodemailer.createTransport({
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export const mailOptions = {
  from: 'yura.vasilenko@meta.ua',
  to: 'yura.vasilenko98@gmail.com',
  subject: 'Тестовое сообщение',
  text: 'Привет, это тестовое сообщение!',
};
