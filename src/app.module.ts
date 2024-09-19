import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from './hotels/hotels.service';
import { HotelsController } from './hotels/hotels.controller';
import { HotelRoomsController } from './hotel-rooms/hotel-rooms.controller';
import { Hotel, HotelSchema } from './hotels/schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './hotels/schemas/hotel-room.schema';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
    ReservationsModule,
    SupportModule,
  ],
  controllers: [HotelsController, HotelRoomsController],
  providers: [HotelsService],
})
export class HotelsModule {}
