import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const filePath = path.resolve(__dirname, '../', '../', 'tmp', 'files');
export default {
  filePath,
  storage: multer.diskStorage({
    destination: filePath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(8).toString('HEX');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
