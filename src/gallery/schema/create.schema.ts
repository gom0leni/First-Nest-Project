import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Report } from 'src/reports/report.schema';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true, versionKey: false })
export class Gallery {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  path: string;

  @Prop()
  originalname: string;

  @Prop()
  mimetype: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Report' })
  @Type(() => Report)
  reportId: Report;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
