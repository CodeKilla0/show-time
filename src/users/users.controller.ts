import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('/users/create')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.UsersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Get('/users/email/:email')
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.UsersService.findByEmail(email);
  }

  @Get('/show/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.UsersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.UsersService.delete(id);
  }

  //update user profile
  @Put('/update/')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.UsersService.updateUser(id, updateUserDto);
  }
}
