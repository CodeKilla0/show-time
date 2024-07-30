import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservedService } from './reserved.service';
import { CreateReservedDto } from './dto/create-reserved.dto';
// import { UpdateReservedDto } from './dto/update-reserved.dto';

@Controller('reserved')
export class ReservedController {
  constructor(private readonly reservedService: ReservedService) {}

  @Post()
  create(@Body() createReservedDto: CreateReservedDto) {
    return this.reservedService.create(createReservedDto);
  }

  @Get()
  findAll() {
    return this.reservedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateReservedDto: UpdateReservedDto,
  // ) {
  //   return this.reservedService.update(+id, updateReservedDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedService.delete(+id);
  }
}
