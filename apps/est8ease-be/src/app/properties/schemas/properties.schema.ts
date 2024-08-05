// import { Schema } from 'mongoose';

// export const PropertySchema = new Schema({
//   price: Number,
//   address: String,
//   price_m2: Number,
//   bedrooms: Number,
//   bathrooms: Number,
//   url: String,
//   sourceId: String,
//   size: Number,
//   source: String,
//   name_of_area: String,
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property {
  @Prop()
  price: number;

  @Prop()
  address: string;

  @Prop()
  price_m2: number;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop()
  url: string;

  @Prop()
  sourceId: string;

  @Prop()
  size: number;

  @Prop()
  source: string;

  @Prop()
  name_of_area: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
