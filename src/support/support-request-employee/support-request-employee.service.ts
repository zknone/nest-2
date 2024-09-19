import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISupportRequestEmployeeService } from '../interfaces/support-request-employee.interface';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Message, MessageDocument } from '../schemas/message.schema';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto/mark-messages-as-read.dto';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
    await this.messageModel
      .updateMany(
        {
          supportRequest: params.supportRequest,
          author: params.user,
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
        author: supportRequest,
        readAt: { $exists: false },
      })
      .exec();
  }

  async closeRequest(supportRequest: string): Promise<void> {
    await this.supportRequestModel
      .findByIdAndUpdate(supportRequest, {
        isActive: false,
      })
      .exec();
  }
}
