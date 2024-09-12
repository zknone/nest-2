import { ObjectId } from 'mongoose';
import { Hotel } from '../schemas/hotel.schema';

export interface SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

export interface UpdateHotelParams {
  title: string;
  description: string;
}

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ObjectId): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel>;
}

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: ObjectId;
  isEnabled?: boolean;
}
