import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { IsLatitude, IsLongitude } from 'class-validator';
import { User } from 'src/users/user.schema';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true, versionKey: false })
export class Report {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ default: false })
  approve: boolean;

  @Prop({ min: 0, required: true })
  price: string;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true, min: 1930, max: 2022 })
  year: number;

  @Prop({ required: true, min: 0, max: 1000000 })
  mileage: number;

  @Prop({ validate: IsLongitude() })
  lng: number;

  @Prop({ validate: IsLatitude() })
  lat: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  user: User;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
