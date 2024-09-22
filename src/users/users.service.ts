import {
  Injectable,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { SearchUserParams } from './interface/interface';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const existingUser = await this.findByEmail(createUserDTO.email);
    if (existingUser) {
      throw new ConflictException('Email уже занят');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDTO.password,
      this.saltRounds,
    );

    const newUser = new this.userModel({
      ...createUserDTO,
      passwordHash: hashedPassword,
    });

    return newUser.save();
  }

  async findAll(
    params?: Partial<SearchUserParams>,
    role?: string,
  ): Promise<User[]> {
    if (role !== 'admin' && role !== 'manager') {
      throw new ForbiddenException('Доступ запрещен');
    }

    const query: any = {};

    if (params?.email) {
      query.email = new RegExp(params.email, 'i');
    }
    if (params?.name) {
      query.name = new RegExp(params.name, 'i');
    }
    if (params?.contactPhone) {
      query.contactPhone = new RegExp(params.contactPhone, 'i');
    }

    return this.userModel
      .find(query)
      .skip(params?.offset || 0)
      .limit(params?.limit || 0)
      .exec();
  }

  async createByAdmin(
    createUserDTO: CreateUserDTO,
    role: string,
  ): Promise<User> {
    if (role !== 'admin') {
      throw new ForbiddenException('Доступ запрещен');
    }

    return this.create(createUserDTO);
  }

  async createByManager(
    createUserDTO: CreateUserDTO,
    role: string,
  ): Promise<User> {
    if (role !== 'manager') {
      throw new ForbiddenException('Доступ запрещен');
    }

    return this.create(createUserDTO);
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
