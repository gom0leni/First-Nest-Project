import { Document } from 'mongoose';

export interface Gallery extends Document {
  path: string;
  originalname: string;
  mimetype: string;
}
