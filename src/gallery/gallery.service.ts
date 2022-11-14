import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGalleryDto } from './dtos/create-gallery.dto';
import { Gallery } from './interface/gallery.interface';

@Injectable()
export class GalleryService {
  constructor(@InjectModel('Gallery') private repo: Model<Gallery>) {}
    
  async uploadImage(galleryDto: CreateGalleryDto) {    
    const images = this.repo.insertMany(galleryDto);

    return await images;
  }
}
