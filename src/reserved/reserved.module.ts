import { Module } from '@nestjs/common';
import { ReservedService } from './reserved.service';
import { ReservedController } from './reserved.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserved, ReservedSchema } from './schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reserved.name, schema: ReservedSchema },
    ]),
  ],
  controllers: [ReservedController],
  providers: [ReservedService],
  exports: [ReservedService],
})
export class ReservedModule {}
