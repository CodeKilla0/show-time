import { Injectable } from '@nestjs/common';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { Model } from 'mongoose';
import { Categories } from './schemas/ticket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private categoriesModel: Model<Categories>,
  ) {}

  async create(createCategoryDto: CreateCategoriesDto): Promise<Categories> {
    return await this.categoriesModel.create(createCategoryDto);
  }

  async findAll(): Promise<Categories[]> {
    return await this.categoriesModel.find().exec();
  }

  async findOne(id: string): Promise<Categories> {
    return this.categoriesModel.findOne({ _id: id }).exec();
  }

  async delete(id: string): Promise<Categories> {
    return await this.categoriesModel.findByIdAndDelete({ _id: id }).exec();
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoriesDto,
  ): Promise<Categories> {
    return this.categoriesModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }
}
