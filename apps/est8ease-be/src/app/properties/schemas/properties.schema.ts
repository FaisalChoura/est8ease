// import { Schema } from 'mongoose';

// export const PropertySchema = new Schema({
//   price: Number,
//   address: String,
//   price_m2: Number,
//   bedrooms: Number,
//   bathrooms: Number,
//   url: String,
//   source_id: String,
//   size: Number,
//   source: String,
//   name_of_area: String,
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
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
  source_id: string;

  @Prop()
  size: number;

  @Prop()
  source: string;

  @Prop()
  name_of_area: string;

  @Prop({ type: Object })
  extra_details: Record<string, boolean>;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const PropertySchema = SchemaFactory.createForClass(Property).set('collection', 'properties_ai');
