import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from './message.schema';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class SupportRequest {
  @Prop({ type: Types.ObjectId, required: true })
  user: Types.ObjectId;

  @Prop({ type: [Message], default: [] })
  messages: Message[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type SupportRequestDocument = SupportRequest & Document;
export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
