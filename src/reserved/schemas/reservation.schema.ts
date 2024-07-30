import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Events } from 'src/events/schemas/events.schema';
import { User } from 'src/users/schemas/user.schema';

export type ReservedDocument = HydratedDocument<Reserved>;

@Schema({ timestamps: true })
export class Reserved {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Events' })
  eventId: Events;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: User;
}

export const ReservedSchema = SchemaFactory.createForClass(Reserved);
