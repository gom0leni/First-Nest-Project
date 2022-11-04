import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Report, ReportSchema } from 'src/reports/report.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({
    unique: true,
    validate: IsEmail(),
    required: true,
  })
  email: string;

  @Prop({
    minlength: 5,
    maxlength: 1024,
    required: true,
  })
  @Exclude()
  password: string;

  @Prop({ type: ReportSchema })
  @Type(() => Report)
  reports: Report[];
}

export const UserSchema = SchemaFactory.createForClass(User);
