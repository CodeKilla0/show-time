import { Injectable } from '@nestjs/common';
import { CreateReservedDto } from './dto/create-reserved.dto';
import { Reserved } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservedService {
  constructor(
    @InjectModel(Reserved.name) private reservedModel: Model<Reserved>,
  ) {}

  async create(createReservedDto: CreateReservedDto): Promise<Reserved> {
    return await this.reservedModel.create(createReservedDto);
  }

  async findAll(): Promise<Reserved[]> {
    return this.reservedModel.find().exec();
  }

  async findOne(id: number): Promise<Reserved> {
    return this.reservedModel.findOne({ _id: id }).exec();
  }

  delete(id: number) {
    return `This action removes a #${id} reserved`;
  }
}
