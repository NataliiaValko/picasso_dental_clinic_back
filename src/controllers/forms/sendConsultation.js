import fs from 'fs';

import TelegramBot from 'node-telegram-bot-api';

import { env, uploadToS3 } from '../../helpers/index.js';
import { generateEmailConsultation } from '../../templates/index.js';

const TG_API_TOKEN = env('TG_API_TOKEN');
const TG_CHAT_ID = env('TG_CHAT_ID');

const bot = new TelegramBot(TG_API_TOKEN, {
  polling: false,
  request: {
    strictSSL: false,
  },
});

const sendConsultation = async (req, res) => {
  if (req.file.size < 45 * 1024 * 1024) {
    await bot.sendDocument(TG_CHAT_ID, fs.createReadStream(req.file.path), {
      caption: generateEmailConsultation(req.body, 'tg'),
      contentType: 'application/octet-stream',
    });
  } else if (
    req.file.size > 45 * 1024 * 1024 &&
    req.file.mimetype === 'application/x-zip-compressed'
  ) {
    const awsLink = await uploadToS3(
      req.file.originalname,
      req.file.path,
      'application/zip'
    );
    await bot.sendMessage(
      TG_CHAT_ID,
      generateEmailConsultation(req.body, 'aws', awsLink)
    );
  } else {
    fs.unlinkSync(req.file.path);
    res.status(400).json({ message: 'File too large' });
    return;
  }

  fs.unlinkSync(req.file.path);

  res.status(200).json({ message: 'File sent successfully' });
};

export default sendConsultation;

// ---------------------------------------------------------------------------

// import fs from 'fs';

// import { transporter, mailOptions } from '../../helpers/index.js';
// import { generateEmailConsultation } from '../../templates/index.js';

// const sendConsultation = async (req, res) => {
//   await transporter.sendMail({
//     ...mailOptions,
//     subject: 'Онлайн консультація',
//     text: generateEmailConsultation(req.body),
//     attachments: [
//       {
//         filename: req.file.originalname,
//         path: req.file.path,
//       },
//     ],
//   });

//   fs.unlinkSync(req.file.path);

//   res.status(200).json({ message: 'File sent successfully' });
// };

// ------------------------------------------------------------------------------

// import SibApiV3Sdk from '@getbrevo/brevo';
// import fs from 'fs';

// const sendConsultation = async (req, res) => {
//   try {
//     // Инициализация API
//     let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//     // Установка ключа API
//     let apiKey = apiInstance.authentications['apiKey'];
//     apiKey.apiKey =
//       ''; // Установите ваш API ключ

//     // Создание объекта для отправки электронного письма
//     let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//     // Установка параметров письма
//     sendSmtpEmail.subject = 'Онлайн консультація';
//     sendSmtpEmail.htmlContent = `<html><body><h1>Это моя первая транзакционная консультация </h1></body></html>`;
//     sendSmtpEmail.sender = {
//       name: 'John Doe',
//       email: 'yura.vasilenko98@gmail.com',
//     };
//     sendSmtpEmail.to = [
//       { email: 'yura.vasilenko98@gmail.com', name: 'Jane Doe' },
//     ];
//     sendSmtpEmail.cc = [
//       { email: 'yura.vasilenko98@gmail.com', name: 'Janice Doe' },
//     ];
//     sendSmtpEmail.bcc = [
//       { name: 'John Doe', email: 'yura.vasilenko98@gmail.com' },
//     ];
//     sendSmtpEmail.replyTo = {
//       email: 'yura.vasilenko98@gmail.com',
//       name: 'John Doe',
//     };
//     sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' };
//     sendSmtpEmail.params = {
//       parameter: 'My param value',
//       subject: 'New Subject',
//     };

//     // Загрузка файла на сервер
//     const filePath = req.file.path; // Получение пути к файлу из запроса
//     const fileContent = fs.readFileSync(filePath).toString('base64'); // Чтение файла и преобразование в base64

//     // Добавление вложения к письму
//     sendSmtpEmail.attachment = [
//       {
//         content: fileContent,
//         name: req.file.originalname, // Имя файла вложения
//         contentType: 'application/pdf', // Тип содержимого файла
//       },
//     ];

//     // Отправка письма
//     const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log(
//       'API called successfully. Returned data: ' + JSON.stringify(data)
//     );

//     // Успешный ответ клиенту
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     // Обработка ошибок
//     console.error(error);
//     res.status(500).json({ message: 'Error sending email' });
//   } finally {
//     // Удаление временного файла после отправки письма
//     if (req.file) {
//       fs.unlinkSync(req.file.path);
//     }
//   }
// };

// export default sendConsultation;
