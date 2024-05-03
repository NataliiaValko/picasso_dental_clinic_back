import fs from 'fs';

// import { transporter, mailOptions } from '../../helpers/index.js';
// import { generateEmailConsultation } from '../../templates/index.js';

// const sendConsultation = async (req, res) => {
//   // await transporter.sendMail({
//   //   ...mailOptions,
//   //   subject: 'Онлайн консультація',
//   //   text: generateEmailConsultation(req.body),
//   //   attachments: [
//   // {
//   //   filename: req.file.originalname,
//   //   path: req.file.path,
//   // },
//   //   ],
//   // });

//   fs.unlinkSync(req.file.path);

//   res.status(200).json({ message: 'File sent successfully' });
// };

import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

import { env } from '../../helpers/index.js';
import { generateEmailConsultation } from '../../templates/index.js';

const TG_API_TOKEN = env('TG_API_TOKEN');
const TG_CHAT_ID = env('TG_CHAT_ID');
const TG_API_URL = `https://api.telegram.org/bot${TG_API_TOKEN}/sendDocument`;

const bot = new TelegramBot(TG_API_TOKEN, { polling: false });

const sendConsultation = async (req, res) => {
  await bot.sendDocument(TG_CHAT_ID, fs.createReadStream(req.file.path), {
    caption: generateEmailConsultation(req.body),
    // parse_mode: 'MarkdownV2',
    contentType: 'application/octet-stream',
  });

  fs.unlinkSync(req.file.path);

  res.status(200).json({ message: 'File sent successfully' });
};

export default sendConsultation;
