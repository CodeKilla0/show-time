import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
//timestamp

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  ville: string;

  @Prop({ required: true })
  numero: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  active: number;

  @Prop({ required: false })
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
