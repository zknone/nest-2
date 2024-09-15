import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from './hotels/hotels.service';
import { HotelsController } from './hotels/hotels.controller';
import { HotelRoomsController } from './hotel-rooms/hotel-rooms.controller';
import { Hotel, HotelSchema } from './hotels/schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './hotels/schemas/hotel-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelsController, HotelRoomsController],
  providers: [HotelsService],
})
export class HotelsModule {}
