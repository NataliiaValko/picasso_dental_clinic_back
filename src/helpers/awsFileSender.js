import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';

import env from './env.js';
import { generateAwsErrorToTg } from '../templates/index.js';

// Конфігурація доступу до S3
const BUCKET_NAME = env('BUCKET_NAME');
const REGION = env('REGION');
const ACCESS_KEY_ID = env('ACCESS_KEY_ID');
const SECRET_ACCESS_KEY = env('SECRET_ACCESS_KEY');
const TG_API_TOKEN = env('TG_API_TOKEN');
const TG_CHAT_ID = env('TG_CHAT_ID');

const bot = new TelegramBot(TG_API_TOKEN, { polling: false });

// Створення клієнта S3
export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// Функція для завантаження файлу в S3
export async function uploadToS3(originalname, filePath, mimetype) {
  try {
    const buffer = await readFile(filePath);
    const params = {
      Bucket: BUCKET_NAME,
      Key: originalname,
      Body: buffer,
      ContentType: mimetype,
    };

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    // console.log('Файл успішно завантажено:', result);
    return `Файл доступний за посиланням: https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${originalname}`;
  } catch (error) {
    bot.sendMessage(TG_CHAT_ID, generateAwsErrorToTg(error));
    console.error('Помилка при завантаженні файлу:', error);
  }
}

// Виклик функції для завантаження
// uploadToS3(originalname, filePath, 'application/zip');
