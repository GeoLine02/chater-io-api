// types/express.d.ts
import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      files?: Express.Multer.File[]; // if using single or multiple files
    }
  }
}
