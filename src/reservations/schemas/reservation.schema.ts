import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type ReservationDocument = Reservation & Document;
@Schema()
export class Reservation extends Document {
  @Prop({ type: ObjectId, required: true })
  userId: ObjectId;

  @Prop({ type: ObjectId, required: true })
  hotelId: ObjectId;

  @Prop({ type: ObjectId, required: true })
  roomId: ObjectId;

  @Prop({ type: Date, required: true })
  dateStart: Date;

  @Prop({ type: Date, required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
