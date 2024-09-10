import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { SearchUserParams } from './interface/search-user-params.interface';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { passwordHash, ...rest } = createUserDTO;

    const hashedPassword = await bcrypt.hash(passwordHash, this.saltRounds);

    const newUser = new this.userModel({
      ...rest,
      passwordHash: hashedPassword,
    });

    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(params?: Partial<SearchUserParams>): Promise<User[]> {
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

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) return false;
    return bcrypt.compare(password, user.passwordHash);
  }
}
