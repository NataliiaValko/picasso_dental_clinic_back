import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import Jimp from "jimp";
// import fs from "fs";

// Преобразуем import.meta.url в путь к файлу, а затем получим имя каталога
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = join(__dirname, '../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const uploadAndProcessFile = (req, res, next) => {
  upload.single('file')(req, res, async err => {
    if (err) {
      console.log(tempDir);
      console.log(err);
      next(err);
    } else {
      try {
        // const file = req.file;

        // console.log(file);

        // const image = await Jimp.read(avatarPath);

        // image.resize(250, 250);

        // const resizedAvatarPath = `${tempDir}/resized_${req.file.originalname}`;
        // await image.writeAsync(resizedAvatarPath);

        // fs.unlink(avatarPath, (err) => {
        //   if (err) {
        //     console.error(`Failed to delete temporary file: ${avatarPath}`);
        //   }
        // });

        // req.file.path = resizedAvatarPath;

        next();
      } catch (error) {
        next(error);
      }
    }
  });
};

export default uploadAndProcessFile;
