import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateSupportRequestDto } from '../dto/create-support-request.dto/create-support-request.dto';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto/mark-messages-as-read.dto';
import { ISupportRequestClientService } from '../interfaces/support-request-client.interface';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createSupportRequest(
    data: CreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const newSupportRequest = new this.supportRequestModel({
      user: data.user,
      createdAt: new Date(),
      isActive: true,
    });

    const message = new this.messageModel({
      author: data.user,
      text: data.text,
      sentAt: new Date(),
    });

    newSupportRequest.messages.push(message);
    await message.save();
    return newSupportRequest.save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
    await this.messageModel
      .updateMany(
        {
          supportRequest: params.supportRequest,
          author: { $ne: params.user },
          readAt: { $exists: false },
          sentAt: { $lte: params.createdBefore },
        },
        { readAt: new Date() },
      )
      .exec();
  }

  async getUnreadCount(supportRequest: string): Promise<number> {
    return this.messageModel
      .countDocuments({
        supportRequest,
        author: { $ne: supportRequest },
        readAt: { $exists: false },
      })
      .exec();
  }
}
