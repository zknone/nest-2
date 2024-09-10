import { User } from '../schemas/user.schema';
import { ObjectId } from 'mongoose';
import { SearchUserParams } from './search-user-params.interface';

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ObjectId): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params?: SearchUserParams): Promise<User[]>;
}
