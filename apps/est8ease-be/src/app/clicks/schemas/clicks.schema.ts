import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClickDocument = HydratedDocument<Click>;

@Schema({ timestamps: true })
export class Click {
  @Prop()
  email: string;

  @Prop({ type: Map, of: String })
  meta_data: Map<string, string>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ClickSchema = SchemaFactory.createForClass(Click);
