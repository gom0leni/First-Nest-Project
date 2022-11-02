import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private repo: Model<User>) {}

  async create(email: string, password: string) {
    const user = new this.repo({ email, password });

    return await user.save();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    return await this.repo.findById(id);
  }

  async find(email: string) {
    return await this.repo.find({ email });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new Error('user not found.');
    }

    Object.assign(user, attrs);

    return this.repo.create(user);
  }

  async remove(id: string) {
    const result = await this.repo.findByIdAndDelete(id);

    if (result === null) {
      throw new NotFoundException(`User with id "${id}" not found!`);
    }

    return 'The record was successfully deleted';
  }
}
