import { Document } from 'mongoose';

export interface Report extends Document {
  price: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  lng: number;
  lat: number;
}
