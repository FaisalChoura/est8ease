import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InterestDocument = HydratedDocument<Interest>;

@Schema()
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
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
