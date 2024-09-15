import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HotelsService } from '../hotels/hotels.service';
import { CreateRoomDTO } from '../hotels/dto/create-room.dto';
import { SearchRoomsParams } from '../hotels/interface/interface';
import { ObjectId } from 'mongoose';
import { HotelRoom } from 'src/hotels/schemas/hotel-room.schema';

@Controller('hotels/:hotelId/rooms')
export class HotelRoomsController {
  constructor(private readonly hotelService: HotelsService) {}

  @Post()
  createRoom(@Param('hotelId') hotelId: string, @Body() query: CreateRoomDTO) {
    return this.hotelService.createRoom({ ...query, hotel: hotelId });
  }

  @Get(':roomId')
  findRoomById(@Param('roomId') roomId: string) {
    return this.hotelService.findRoomById(roomId);
  }

  @Get()
  searchRooms(
    @Param('hotelId') hotelId: ObjectId,
    @Query() params: SearchRoomsParams,
  ) {
    return this.hotelService.searchRooms({ ...params, hotel: hotelId });
  }

  @Put(':roomId')
  updateRoom(
    @Param('roomId') roomId: ObjectId,
    @Body() params: Partial<HotelRoom>,
  ) {
    return this.hotelService.updateRoom(roomId, params);
  }
}
