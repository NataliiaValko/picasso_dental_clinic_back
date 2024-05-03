import axios from 'axios';

import { generateMessCall } from '../../templates/index.js';
import { env } from '../../helpers/index.js';

const TG_API_TOKEN = env('TG_API_TOKEN');
const TG_CHAT_ID = env('TG_CHAT_ID');
const TG_API_URL = `https://api.telegram.org/bot${TG_API_TOKEN}/sendMessage`;

const sendCall = async (req, res) => {
  const tgBody = {
    chat_id: TG_CHAT_ID,
    text: generateMessCall(req.body),
  };

  await axios.post(TG_API_URL, tgBody);

  res.status(200).json({ message: 'Message sent successfully' });
};

export default sendCall;
