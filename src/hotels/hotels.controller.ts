import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { CreateHotelDTO } from './dto/create-hotel.dto';
import { HotelsService } from './hotels.service';
import { SearchHotelParams, UpdateHotelParams } from './interface/interface';
import { ObjectId } from 'mongoose';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelService: HotelsService) {}

  @Post()
  create(@Body() query: CreateHotelDTO) {
    return this.hotelService.create(query);
  }

  @Get()
  findById(@Query() id: string) {
    return this.hotelService.findById(id);
  }

  @Get()
  search(@Query() params: SearchHotelParams) {
    return this.hotelService.search(params);
  }

  @Put()
  update(@Body() id: ObjectId, params: UpdateHotelParams) {
    return this.hotelService.update(id, params);
  }
}
