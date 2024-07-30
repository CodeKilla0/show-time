import { Model } from 'mongoose';
import { Events } from './schemas/events.schema';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-events.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateEventDto } from './dto/update-events.dto';
import { UpdateEventTicketDto } from './dto/update-events-ticket.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Events.name) private eventsModel: Model<Events>) {}

  async create(createEventDto: CreateEventDto): Promise<Events> {
    return await this.eventsModel.create(createEventDto);
  }

  async findAll(): Promise<Events[]> {
    return this.eventsModel.find().exec();
  }

  async findOne(id: string): Promise<Events> {
    return this.eventsModel.findOne({ _id: id }).exec();
  }

  async deleteE(id: string): Promise<Events> {
    return await this.eventsModel.findByIdAndDelete(id).exec();
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Events> {
    return this.eventsModel
      .findByIdAndUpdate({ _id: id }, updateEventDto, { new: true })
      .exec();
  }

  async updateEventTicket(
    id: string,
    updateEventTicketDto: UpdateEventTicketDto,
  ): Promise<Events> {
    return this.eventsModel
      .findByIdAndUpdate({ _id: id }, updateEventTicketDto, { new: true })
      .exec();
  }
}
