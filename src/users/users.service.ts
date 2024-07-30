import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPassDto } from './dto/update-user-pass.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }

  // find user by email
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  // update user profile
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  //update user profile
  async updateUserPassword(
    id: string,
    updateUserPassDto: UpdateUserPassDto,
  ): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(
        id,
        { password: updateUserPassDto.password },
        { new: true },
      )
      .exec();
  }

  // udpate user admin
  async updateUserAdmin(
    id: string,
    updateUserAdminDto: UpdateUserAdminDto,
  ): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, { admin: updateUserAdminDto.admin }, { new: true })
      .exec();
  }

  // check if user is admin
  async isAdmin(id: string): Promise<boolean> {
    const user = await this.userModel.findById(id).exec();
    return user.admin === true;
  }

  //found user by id
  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
}
