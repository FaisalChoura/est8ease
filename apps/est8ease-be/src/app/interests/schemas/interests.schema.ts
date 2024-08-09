import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InterestDocument = HydratedDocument<Interest>;

@Schema({ timestamps: true })
export class Interest {
  @Prop()
  email: string;

  @Prop()
  min_price: number;

  @Prop()
  max_price: number;

  @Prop()
  number_of_bedrooms: number;

  @Prop()
  size: number;

  @Prop()
  name_of_area: string;

  @Prop()
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
