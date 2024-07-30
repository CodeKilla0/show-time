import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;
//timestamp

@Schema({ timestamps: true })
export class Categories {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const CatSchema = SchemaFactory.createForClass(Categories);
