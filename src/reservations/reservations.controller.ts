import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import {
  ReservationDto,
  ReservationSearchOptions,
} from './interfaces/reservation.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() reservationDto: ReservationDto) {
    return this.reservationsService.addReservation(reservationDto);
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string) {
    return this.reservationsService.removeReservation(id);
  }

  @Get()
  async getReservations(@Query() query: ReservationSearchOptions) {
    return this.reservationsService.getReservations(query);
  }
}
