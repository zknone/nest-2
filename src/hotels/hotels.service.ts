import { Injectable } from '@nestjs/common';
import { CreateHotelDTO } from './dto/create-hotel.dto';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchHotelParams } from './interface/interface';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}
  async create(createHotelDTO: CreateHotelDTO): Promise<Hotel> {
    const newHotel = new this.hotelModel(createHotelDTO);
    return newHotel.save();
  }

  async findById(id: string): Promise<Hotel | null> {
    return this.hotelModel.findOne({ id }).exec();
  }

  search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params;

    const filter = title ? { title: new RegExp(title, 'i') } : {};
    return this.hotelModel
      .find(filter)
      .skip(offset || 0)
      .limit(limit || 0)
      .exec();
  }
}
