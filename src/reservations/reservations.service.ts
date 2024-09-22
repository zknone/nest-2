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
    const isRoomAvailable = await this.reservationModel.exists({
      roomId: data.roomId,
      $or: [
        { dateStart: { $lt: data.dateEnd }, dateEnd: { $gt: data.dateStart } },
      ],
    });

    if (isRoomAvailable) {
      throw new Error('Room is not available for the selected dates');
    }

    const newReservation = new this.reservationModel(data);
    return newReservation.save();
  }

  async removeReservation(id: string): Promise<void> {
    const result = await this.reservationModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Reservation not found');
    }
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Reservation[]> {
    const query: any = {};

    if (filter.userId) {
      query.userId = filter.userId;
    }

    if (filter.dateStart || filter.dateEnd) {
      query.$and = [];

      if (filter.dateStart) {
        query.$and.push({ dateStart: { $gte: filter.dateStart } });
      }
      if (filter.dateEnd) {
        query.$and.push({ dateEnd: { $lte: filter.dateEnd } });
      }
    }

    return this.reservationModel.find(query).exec();
  }
}
