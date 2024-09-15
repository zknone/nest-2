import { Injectable } from '@nestjs/common';
import { CreateHotelDTO } from './dto/create-hotel.dto';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  SearchHotelParams,
  SearchRoomsParams,
  UpdateHotelParams,
} from './interface/interface';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { CreateRoomDTO } from './dto/create-room.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  async create(createHotelDTO: CreateHotelDTO): Promise<Hotel> {
    const newHotel = new this.hotelModel(createHotelDTO);
    return newHotel.save();
  }

  async findById(id: string): Promise<Hotel | null> {
    return this.hotelModel.findOne({ id }).exec();
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params;

    const filter = title ? { title: new RegExp(title, 'i') } : {};
    return this.hotelModel
      .find(filter)
      .skip(offset || 0)
      .limit(limit || 0)
      .exec();
  }

  async update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel> {
    return this.hotelModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async createRoom(createRoomDTO: CreateRoomDTO): Promise<HotelRoom> {
    const newRoom = new this.hotelRoomModel(createRoomDTO);
    return newRoom.save();
  }

  async findRoomById(id: string): Promise<HotelRoom | null> {
    return this.hotelRoomModel.findOne({ id }).exec();
  }

  async searchRooms(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { limit, offset, hotel, isEnabled } = params;

    const filter: any = { hotel };
    if (isEnabled !== undefined) {
      filter.isEnabled = isEnabled;
    }

    return this.hotelRoomModel
      .find(filter)
      .skip(offset || 0)
      .limit(limit || 0)
      .exec();
  }

  async updateRoom(id: ObjectId, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }
}
