import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
