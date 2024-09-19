import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import {
  ReservationDto,
  ReservationSearchOptions,
  IReservation,
} from './interfaces/reservation.interface';

@Injectable()
export class ReservationsService implements IReservation {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const existingReservations = await this.reservationModel.find({
      roomId: data.roomId,
      dateStart: { $lt: data.dateEnd },
      dateEnd: { $gt: data.dateStart },
    });

    if (existingReservations.length > 0) {
      throw new Error('Room is not available for the selected dates');
    }

    const newReservation = new this.reservationModel(data);
    return newReservation.save();
  }

  async removeReservation(id: string): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id);
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Reservation[]> {
    const query = {
      userId: filter.userId,
      dateStart: { $gte: filter.dateStart },
      dateEnd: { $lte: filter.dateEnd },
    };

    return this.reservationModel.find(query).exec();
  }
}
