import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './interface/report.interface';

@Injectable()
export class ReportsService {
  constructor(@InjectModel('Report') private repo: Model<Report>) {}

  async create(reportDto: CreateReportDto) {
    const report = new this.repo(reportDto);

    return await report.save();
  }
}
