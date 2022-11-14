import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('image', 15, {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          return cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files: any) {
    return this.galleryService.uploadImage(files);
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
