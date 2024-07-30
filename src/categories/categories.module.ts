import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CatSchema } from './schemas/ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Categories.name, schema: CatSchema }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
