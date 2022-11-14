import { IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  path: string;

  @IsString()
  originalname: string;

  @IsString()
  mimetype: string;
}
