import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {
    const prefix = uuidv4();
    cb(null, `${prefix}-${path.basename(file.originalname)}`);
  },
});

export const uploadMiddleware = multer({ storage });