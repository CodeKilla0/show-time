import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Categories } from 'src/categories/schemas/ticket.schema';

export type EventsDocument = HydratedDocument<Events>;

@Schema({ timestamps: true })
export class Events {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' })
  categoriesId: Categories;

  @Prop({ required: true })
  ville: string;

  @Prop({ required: true })
  prix: number;

  @Prop({ required: true })
  ticket: number;

  @Prop({ required: true })
  lieu: string;

  @Prop({ required: true })
  file: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  numero: string;

  @Prop({ required: true })
  code_events: number;

  @Prop({ required: false })
  website: string;

  @Prop({ required: true })
  localisation: string;
}

export const EventsSchema = SchemaFactory.createForClass(Events);
