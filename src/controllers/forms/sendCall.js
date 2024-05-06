import TelegramBot from 'node-telegram-bot-api';

import { generateMessCall } from '../../templates/index.js';
import { env } from '../../helpers/index.js';

const TG_API_TOKEN = env('TG_API_TOKEN');
const TG_CHAT_ID = env('TG_CHAT_ID');

const bot = new TelegramBot(TG_API_TOKEN, { polling: false });

const sendCall = async (req, res) => {
  const message = generateMessCall(req.body);

  await bot.sendMessage(TG_CHAT_ID, message);

  res.status(200).json({ message: 'Message sent successfully' });
};

export default sendCall;
