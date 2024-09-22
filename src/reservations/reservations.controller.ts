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

@Controller('api/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() reservationDto: ReservationDto) {
    try {
      return this.reservationsService.addReservation(reservationDto);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string) {
    try {
      return this.reservationsService.removeReservation(id);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get()
  async getReservations(@Query() query: ReservationSearchOptions) {
    return this.reservationsService.getReservations(query);
  }
}
