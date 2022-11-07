import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './interface/report.interface';

@Injectable()
export class ReportsService {
  constructor(@InjectModel('Report') private repo: Model<Report>) {}

  createEstimate({ make, model, lng, lat }: GetEstimateDto) {
    return this.repo
      .find()
      .where({ make })
      .where({ model })
      .where({ lng })
      .where({ lat });
  }

  async create(reportDto: CreateReportDto, user: User) {
    const report = new this.repo({
      ...reportDto,
      user,
    });

    return await report.save();
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOneAndUpdate(
      { _id: id },
      { approve: approved },
      { new: true },
    );

    if (!report) {
      throw new NotFoundException('Report not found!');
    }

    return report;
  }
}
